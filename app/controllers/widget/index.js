import { BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import store from 'store/storeMain';
import createWidget from 'utils/createWidget';
import * as actions from 'actions/widget';
import * as TYPES from 'actions/actionTypes';

const widgetController = (action) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.REGISTER_NEW_WIDGET: {
      const ENV_PATH = process.env.NODE_ENV === 'development' ? 'app/page/webview/index.html' : 'build/widget.html';
      const { id, info } = action.payload;
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

      widget.on('closed', () => {
        // TODO type location and position
        store.dispatch(actions.closeTargetWidget(id));
      });

      widget.show();
      store.dispatch(actions.registerNewWidgetBrowserWindow(id, widget));
      break;
    }
  }
};

export default widgetController;
