import { BrowserWindow } from 'electron';
import os from 'os';
import url from 'url';
import * as actions from 'actions/widget';
import store from 'store/storeMain';
import createWidget from 'main/utils/widget/createWidget';
import updateWidgetContentBounds from 'main/utils/widget/updateWidgetContentBounds';
import * as PATH from 'constants/path';

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
    titleBarStyle: os.platform() === 'darwin' ? 'hiddenInset' : 'default',
    show: false,
    frame: false,
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

  widget.on('closed', () => {
    store.dispatch(actions.closeTargetWidgetForced(id));
  });

  widget.on('focus', () => {
    store.dispatch(actions.focusWidget(id));
  });

  widget.webContents.on('did-finish-load', () => {
    store.dispatch(actions.allocateIdTargetWidget(id));
  });

  return widget;
};

export default makeWidget;
