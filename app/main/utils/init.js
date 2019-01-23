import {
  app,
  BrowserView,
  BrowserWindow,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import autoLaunch from 'main/utils/window/autoLaunch';
import createMenu from 'main/utils/menu/createMenu';
import handlingSearchHotKey from 'main/utils/menu/handlingSearchHotKey';
import openAllWidgetStatusOpen from 'main/utils/window/openAllWidgetStatusOpen';
import store from 'store/storeMain';
import subscribeActionMain from 'store/utils/subscribeActionMain';
import { hotKeySearchWindowSelector } from 'store/reducers/share/config/selectors';
import saveData from 'main/utils/disk/saveData';
import TrayMenuBar from 'main/utils/menu/trayMenuBar';
import { setInitialStore } from 'actions/setting';
import e2eIpcHandler from '../../e2e-ipc-handler';

// save data about setting every 5 minutes.
const SAVE_SETTING_INTERVAL = 300000;

function init() {
  autoLaunch();
  subscribeActionMain(store);
  createMenu();
  handlingSearchHotKey(hotKeySearchWindowSelector(store.getState()));
  openAllWidgetStatusOpen();
  autoUpdater.checkForUpdatesAndNotify();
  setInterval(saveData, SAVE_SETTING_INTERVAL);

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

  if (process.env.NODE_ENV === 'test') {
    e2eIpcHandler();
  }
}

export default init;
