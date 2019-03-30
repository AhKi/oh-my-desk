import { BrowserWindow, dialog } from 'electron';
import debounce from 'debounce';
import { LOGO_ICON_PATH, WIDGET_PATH } from 'config';
import store from 'store/storeMain';
import createWidget from 'main/utils/widget/createWidget';
import updateWidgetContentBounds from 'main/utils/widget/updateWidgetContentBounds';
import i18n from 'constants/i18n';
import { widgetInfoByIdSelector } from 'store/reducers/share/identification/selectors';
import * as actions from 'actions/widget';

class WidgetManager {
  constructor() {
    this.window = {};
  }

  addWindow = (id, win) => {
    this.window[id] = win;
  };

  deleteWindow = (id) => {
    delete this.window[id];
  };

  getWindow = (id) => {
    const info = widgetInfoByIdSelector(store.getState()).get(id).toJS();

    return {
      win: this.window[id],
      ...info,
    };
  };

  isExist = id => !!this.window[id];
}

export const manager = new WidgetManager();

function confirmToClose(info) {
  const text = i18n().widget;

  const options = {
    type: 'info',
    title: text.closeWidget,
    message: text.closeMessage(info.name),
    buttons: [text.ok, text.cancel],
    icon: LOGO_ICON_PATH,
  };
  dialog.showMessageBox(options, (index) => {
    if (index === 0) { // when click Yes button
      info.win.destroy();
    }
  });
}

export function openWidget(id, info = createWidget(), isFocus = true) {
  if (manager.isExist(id)) {
    const { win } = manager.getWindow(id);

    win.show();
    return;
  }

  const {
    name,
    position,
    size,
    isOnTop,
  } = info;
  const { x, y } = position;
  const { height, width } = size;

  const widget = new BrowserWindow({
    acceptFirstMouse: true,
    title: name,
    x,
    y,
    width,
    height,
    alwaysOnTop: isOnTop,
    autoHideMenuBar: true,
    show: false,
    frame: false,
    minWidth: 200,
    minHeight: 300,
  });
  manager.addWindow(id, widget);

  widget.loadURL(WIDGET_PATH);
  widget.once('ready-to-show', () => {
    if (isFocus) {
      widget.show();
    } else {
      widget.showInactive();
    }
  });
  widget.on('move',
    debounce(() => updateWidgetContentBounds(id, widget), 1000, true));
  widget.on('resize',
    debounce(() => updateWidgetContentBounds(id, widget), 1000, true));
  widget.on('close', (e) => {
    const targetInfo = manager.getWindow(id);
    const {
      isMakeProgress,
      isEditProgress,
    } = targetInfo;

    /**
     * Confirm when widget is making or is Editing.
     */
    if (isMakeProgress || isEditProgress) {
      e.preventDefault();
      confirmToClose(targetInfo);
    }
  });
  widget.on('closed', () => {
    store.dispatch(actions.widgetClosed(id));
    manager.deleteWindow(id);
  });
  widget.on('focus', () => store.dispatch(actions.widgetFocus(id)));
  widget.webContents.on('did-finish-load',
    () => {
      store.dispatch(actions.widgetAllocateIdTarget(id));
    });
}

export function closeWidget(id) {
  if (manager.isExist(id)) {
    const { win } = manager.getWindow(id);

    win.close();
  }
}

export function setAlwaysOnTop(id, bool) {
  if (manager.isExist(id)) {
    const { win } = manager.getWindow(id);

    win.setAlwaysOnTop(bool);
  }
}
