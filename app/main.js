import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  remote,
  Tray,
} from 'electron';
import path from 'path';
import url from 'url';
import fs from 'fs';
import WidgetManager from 'process/renderer/WidgetManager';
import createMenu from 'process/main/createMenu';
import getStore from 'store';
import subscribeActionMain from 'store/utils/subscribeActionMain';

const MAIN = 'MAIN';
const store = getStore(MAIN);
subscribeActionMain(store);

let informationBeforeQuit;
let setting_win;
const widgetManager = new WidgetManager({
  icon: path.join(__dirname, 'assets', 'icon.png'),
});
let tray;

function createSetting() {
  if (setting_win) {
    setting_win.focus();
    return;
  }

  setting_win = new BrowserWindow({
    width: 960,
    height: 700,
    minWidth: 360,
    icon: path.join(__dirname, 'asset', 'icon.png'),
  });

  const ENV_PATH = process.env.NODE_ENV === 'development' ? 'app/page/setting' : 'build';

  setting_win.loadURL(url.format({
    pathname: path.join(__dirname, '..', ENV_PATH, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  if (process.env.NODE_ENV === 'development') {
    setting_win.webContents.openDevTools();
  }

  setting_win.on('closed', () => {
    setting_win = null;
    widgetManager.setSettingWin(null);
  });

  widgetManager.setSettingWin(setting_win);
}

function createTray(contextMenuTemplate) {
  if (!tray) tray = new Tray(path.join(__dirname, 'assets', 'tray_icon.png'));

  const contextMenu = Menu.buildFromTemplate(contextMenuTemplate.concat([
    { type: 'separator' },
    { label: 'Setting', type: 'normal', click: createSetting },
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

  ipcMain.on('WIDGET_MANAGE', (event, arg) => {
    if (arg.operation === 'CREATE') {
      widgetManager.create(arg.widget);
    } else if (arg.operation === 'UPDATE') {
      widgetManager.update(arg.widget);
    } else if (arg.operation === 'DELETE') {
      widgetManager.delete(arg.widget.id);
    } else {
      throw new Error('WIDGET_MANAGER : operaction is not set');
    }
  });

  ipcMain.on('WIDGET_SHOW_INACTIVE', (e, arg) => {
    widgetManager.callTargetEvent('showInactive', arg);
  });

  ipcMain.on('WIDGET_MANAGER_OPEN', () => {
    createSetting();
  });

  ipcMain.on('WIDGET_OPEN', (event, arg) => {
    widgetManager.update(arg);
    widgetManager.openWindow(arg);
  });

  ipcMain.on('WIDGET_INFO_REQUEST', (event) => {
    event.sender.send('WIDGET_INFO_RESULT', widgetManager.getWidgets());
  });

  if (widgetManager.isFirstTime) createSetting();
}

// remove dock icon on macOS
if (process.platform === 'darwin') {
  app.dock.hide();
}

app.on('ready', init);

app.on('window-all-closed', () => {
});

app.on('before-quit', () => {
  informationBeforeQuit = JSON.stringify(widgetManager.widgetStore.getAll());
});

app.on('quit', () => {
  const configName = 'widgets';
  const userDataPath = (app || remote.app).getPath('userData');
  const savedPath = path.join(userDataPath, `${configName}.json`);

  fs.writeFileSync(savedPath, informationBeforeQuit);
});

app.on('activate', () => {
});
