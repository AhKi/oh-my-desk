import {
  app,
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
import * as statusActions from 'actions/status';

const widgetManager = new WidgetManager({
  icon: path.join(__dirname, 'assets', 'icon.png'),
});
let tray;

function createTray(contextMenuTemplate) {
  if (!tray) tray = new Tray(path.join(__dirname, 'assets', 'iconTemplate.png'));

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
}

app.on('ready', () => {
  subscribeActionMain(store);
  init();
  openAllWidgetStatusOpen();
});

app.on('before-quit', () => {
  store.dispatch(statusActions.closePreference());
  storeDataInDisk();
});

export default store;
