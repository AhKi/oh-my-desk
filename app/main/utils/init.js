import {
  app,
  BrowserView,
  BrowserWindow,
  globalShortcut,
} from 'electron';
import autoLaunch from 'main/utils/window/autoLaunch';
import autoUpdateConfig from 'main/utils/update/autoUpdateConfig';
import createMenu from 'main/utils/menu/createMenu';
import openAllWidgetStatusOpen from 'main/utils/window/openAllWidgetStatusOpen';
import store from 'store/storeMain';
import subscribeActionMain from 'store/utils/subscribeActionMain';
import TrayMenuBar from 'main/utils/menu/trayMenuBar';
import { setInitialStore } from 'actions/status';

function init() {
  autoUpdateConfig();
  subscribeActionMain(store);
  createMenu();

  globalShortcut.register('Ctrl+Space', () => {
    if (TrayMenuBar.window && TrayMenuBar.window.isFocused()) {
      TrayMenuBar.hideWindow();
    } else {
      TrayMenuBar.showWindow();
    }
  });

  if (process.env.NODE_ENV !== 'development') {
    autoLaunch();
  }
  openAllWidgetStatusOpen();
  app.on('activate', (e, isOpenWindow) => {
    if (!isOpenWindow) {
      TrayMenuBar.showWindow();
    } else {
      TrayMenuBar.hideWindow();
    }
  });

  if (process.env.IS_DEVTOOLS) {
    const devToolsWin = new BrowserWindow({ title: 'main process redux-devtools', width: 500, height: 500 });
    const devToolsView = new BrowserView();
    devToolsWin.setBrowserView(devToolsView);
    devToolsView.setBounds({
      x: 0,
      y: 0,
      width: 500,
      height: 480,
    });
    devToolsView.setAutoResize({ width: true, height: true });
    devToolsView.webContents.loadURL('http://remotedev.io/local/');
  }

  store.dispatch(setInitialStore());
}

export default init;
