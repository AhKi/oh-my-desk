import { app, globalShortcut } from 'electron';
import autoLaunch from 'utils/autoLaunch';
import createMenu from 'utils/process/createMenu';
import openAllWidgetStatusOpen from 'utils/process/openAllWidgetStatusOpen';
import store from 'store/storeMain';
import subscribeActionMain from 'store/utils/subscribeActionMain';
import TrayMenuBar from 'utils/process/trayMenuBar';

function init() {
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
}

export default init;
