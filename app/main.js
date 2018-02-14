const {
  app, BrowserWindow, remote, Menu, Tray,
} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const { ipcMain } = require('electron');
const WidgetManager = require('./utils/WidgetManager');

let informationBeforeQuit;
let setting_win;
const widgetManager = new WidgetManager({
  icon: path.join(__dirname, 'resource', 'icon.png'),
});
let tray;

function createSetting() {
  if (setting_win) {
    setting_win.focus();
    return;
  }

  setting_win = new BrowserWindow({
    width: 800,
    height: 800,
    icon: path.join(__dirname, 'resource', 'icon.png'),
  });

  const ENV_PATH = process.env.NODE_ENV === 'development' ? 'app' : 'build';

  setting_win.loadURL(url.format({
    pathname: path.join(__dirname, ENV_PATH, 'index.html'),
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
  if (!tray) tray = new Tray(path.join(__dirname, 'resource', 'tray_icon.png'));

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

// reference by https://electronjs.org/docs/api/menu#examples
function createMenu() {
  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });

    // Edit menu
    template[1].submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' },
        ],
      },
    );

    // Window menu
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' },
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = createMenu();


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
