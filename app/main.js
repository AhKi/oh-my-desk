import {
  app,
  ipcMain,
  Menu,
  Tray,
} from 'electron';
import path from 'path';
import WidgetManager from 'process/renderer/WidgetManager';
import createMenu from 'process/main/createMenu';
import store from 'store/storeMain';
import subscribeActionMain from 'store/utils/subscribeActionMain';
import storeDataInDisk from 'utils/storeDataInDisk';
import openAllWidgetStatusOpen from 'utils/openAllWidgetStatusOpen';
import openPreference from 'process/renderer/openPreference';
import { closePreference } from 'actions/preference';

const widgetManager = new WidgetManager({
  icon: path.join(__dirname, 'assets', 'icon.png'),
});
let tray;

function createTray(contextMenuTemplate) {
  if (!tray) tray = new Tray(path.join(__dirname, 'assets', 'tray_iconTemplate.png'));

  const contextMenu = Menu.buildFromTemplate(contextMenuTemplate.concat([
    { type: 'separator' },
    { label: 'Setting', type: 'normal', click: openPreference },
    {
      label: 'Exit',
      type: 'normal',
      click: () => {
        app.quit();
      },
    },
  ]));

  tray.setToolTip('Oh My Desk');
  tray.setContextMenu(contextMenu);
}

function init() {
  widgetManager.onUpdateTray(createTray);
  widgetManager.openAllWindow();
  createMenu();

  ipcMain.on('WIDGET_SHOW_INACTIVE', (e, arg) => {
    widgetManager.callTargetEvent('showInactive', arg);
  });

  ipcMain.on('WIDGET_MANAGER_OPEN', () => {
    openPreference();
  });
}

app.on('ready', () => {
  subscribeActionMain(store);
  init();
  openAllWidgetStatusOpen();
  openPreference();
});

app.on('before-quit', () => {
  store.dispatch(closePreference());
  storeDataInDisk();
});

export default store;
