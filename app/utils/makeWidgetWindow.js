import { BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import * as actions from 'actions/widget';
import store from 'store/storeMain';
import createWidget from 'utils/createWidget';

const makeWidgetWindow = (id, info) => {
  const ENV_PATH = process.env.NODE_ENV === 'development' ? 'app/page/webview/index.html' : 'build/widget.html';
  const widgetInfo = createWidget(id, info);
  const widget = new BrowserWindow({
    title: widgetInfo.name,
    x: widgetInfo.position.x,
    y: widgetInfo.position.y,
    width: widgetInfo.size.width,
    height: widgetInfo.size.height,
    alwaysOnTop: widgetInfo.isOnTop,
    autoHideMenuBar: true,
    skipTaskbar: true,
    show: false,
    frame: false,
  });

  widget.loadURL(url.format({
    pathname: path.join(__dirname, '../..', ENV_PATH),
    protocol: 'file:',
    slashes: true,
  }));

  widget.once('ready-to-show', () => {
    widget.show();
  });

  widget.on('close', () => {
    const contentBounds = widget.getContentBounds();
    const widgetBounds = {
      position: {
        x: contentBounds.x,
        y: contentBounds.y,
      },
      size: {
        height: contentBounds.height,
        width: contentBounds.width,
      },
    };

    store.dispatch(actions.closeTargetWidget(id, widgetBounds));
  });

  widget.show();
  store.dispatch(actions.registerNewWidgetBrowserWindow(id, widget));

  return widget;
};

export default makeWidgetWindow;
