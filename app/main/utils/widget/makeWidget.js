import { BrowserWindow, dialog } from 'electron';
import url from 'url';
import * as actions from 'actions/widget';
import { widgetInfoByIdSelector } from 'store/reducers/share/identification/selectors';
import store from 'store/storeMain';
import createWidget from 'main/utils/widget/createWidget';
import updateWidgetContentBounds from 'main/utils/widget/updateWidgetContentBounds';
import * as PATH from 'constants/path';
import i18n from 'constants/i18n';

const makeWidget = (id, info, isFocus) => {
  const widgetInfo = createWidget(id, info);
  const widget = new BrowserWindow({
    acceptFirstMouse: true,
    title: widgetInfo.name,
    x: widgetInfo.position.x,
    y: widgetInfo.position.y,
    width: widgetInfo.size.width,
    height: widgetInfo.size.height,
    alwaysOnTop: widgetInfo.isOnTop,
    autoHideMenuBar: true,
    titleBarStyle: 'default',
    show: false,
    frame: false,
    minWidth: 200,
    minHeight: 300,
  });

  widget.loadURL(url.format({
    pathname: PATH.WIDGET_PATH,
    protocol: 'file:',
    slashes: true,
  }));

  widget.once('ready-to-show', () => {
    if (isFocus) {
      widget.show();
    } else {
      widget.showInactive();
    }
  });

  widget.on('move', () => {
    updateWidgetContentBounds(id, widget);
  });

  widget.on('resize', () => {
    updateWidgetContentBounds(id, widget);
  });

  widget.on('close', (e) => {
    const text = i18n().widget;
    const targetInfo = widgetInfoByIdSelector(store.getState()).get(id);
    if (!targetInfo) {
      return;
    }
    const isMakeProgress = targetInfo.get('isMakeProgress');
    const isEditProgress = targetInfo.get('isEditProgress');

    /**
     * Confirm when widget is making or is Editing.
     */
    if (isMakeProgress || isEditProgress) {
      e.preventDefault();
      const options = {
        type: 'info',
        title: text.closeWidget,
        message: text.closeMessage(targetInfo.get('name')),
        buttons: [text.ok, text.cancel],
        icon: PATH.LOGO_ICON_PATH,
      };
      dialog.showMessageBox(options, (index) => {
        if (index === 0) { // when click Yes button
          widget.destroy();
        }
      });
    }
  });

  widget.on('closed', () => {
    store.dispatch(actions.widgetClosed(id));
  });

  widget.on('focus', () => {
    store.dispatch(actions.widgetFocus(id));
  });

  widget.webContents.on('did-finish-load', () => {
    store.dispatch(actions.widgetAllocateIdTarget(id));
  });

  return widget;
};

export default makeWidget;
