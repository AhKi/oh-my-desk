import { app } from 'electron';
import store from 'store/storeMain';
import saveData from 'main/utils/disk/saveData';
import { preferenceClose } from 'actions/preference';
import { widgetCloseWhole } from 'actions/widget';
import { setInitialStore, setWhenQuitApp } from 'actions/setting';
import { isOpenWidgetWhenStartSelector } from 'store/reducers/share/status/selectors';
import TrayMenuBar from 'main/utils/menu/trayMenuBar';
import autoLaunchConfig from 'main/utils/window/autoLaunch';
import subscribeActionMain from 'store/utils/subscribeActionMain';
import createMenu from 'main/utils/menu/createMenu';
import handlingSearchHotKey from 'main/utils/menu/handlingSearchHotKey';
import { hotKeySearchWindowSelector } from 'store/reducers/share/config/selectors';
import openAllWidgetStatusOpen from 'main/utils/window/openAllWidgetStatusOpen';
import openReduxDevTools from 'main/utils/window/openReduxDevTools';
import { autoUpdater } from 'electron-updater';

const SAVE_SETTING_INTERVAL = 300000;

/**
 * When start app.
 */
app.on('ready', () => {
  const state = store.getState();
  const hotkeyToOpenSearch = hotKeySearchWindowSelector(state);

  createMenu();
  handlingSearchHotKey(hotkeyToOpenSearch);
  openAllWidgetStatusOpen();

  // Config action to communication with renderer
  subscribeActionMain(store);

  // auto launch & update
  autoLaunchConfig();
  autoUpdater.checkForUpdatesAndNotify();

  // config data
  setInterval(saveData, SAVE_SETTING_INTERVAL);
  store.dispatch(setInitialStore());

  openReduxDevTools();
});


/**
 * Only Mac OS
 * When start app, relaunch app, dock icon click.
 */
app.on('activate', (e, isOpenWindow) => {
  if (!isOpenWindow) {
    TrayMenuBar.showWindow();
  } else {
    TrayMenuBar.hideWindow();
  }
});

/**
 * When quit app.
 * This event doesn't occur when logout user(terminate OS) on WindowOS.
 */
app.on('before-quit', () => {
  const { getState, dispatch } = store;
  const state = getState();
  const isOpenWidgetWhenStart = isOpenWidgetWhenStartSelector(state);

  if (!isOpenWidgetWhenStart) {
    dispatch(widgetCloseWhole());
  }
  dispatch(preferenceClose());
  dispatch(setWhenQuitApp());
  saveData();
});
