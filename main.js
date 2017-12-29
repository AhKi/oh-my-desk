const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const {ipcMain} = require('electron')
const WidgetManager = require('./src/WidgetManager')

let setting_win
let widgetManager = new WidgetManager()
let tray

function init() {
    createTray();

    widgetManager.openAllWindow();

    ipcMain.on('WIDGET_MANAGE', (event, arg) => {
        if (arg.operation === 'CREATE') {
            widgetManager.create(arg.widget)
        } else if (arg.operation === 'UPDATE') {
            widgetManager.update(arg.widget)
        } else if (arg.operation === 'DELETE') {
            widgetManager.delete(arg.widget.id)
        } else {
            console.error('operaction is not set')
        }
    })

    ipcMain.on('WIDGET_INFO_REQUEST', (event, arg) => {
        event.sender.send('WIDGET_INFO_RESULT', widgetManager.getWidgets())
    })
}

function createTray() {
    if (!tray) tray = new Tray(path.join(__dirname, 'resource', 'icon.png'))
    
    const contextMenu = Menu.buildFromTemplate(widgetManager.buildTrayContextMenuTemplate().concat([
      {label: 'Setting', type: 'normal', click: createSetting},
      {label: 'Exit', type: 'normal', click: function() {
          app.quit();
      }}
    ]))

    tray.setToolTip('Oh My Desk');
    tray.setContextMenu(contextMenu);
}

function createSetting() {
    if (setting_win) return

    setting_win = new BrowserWindow({
        width: 800,
        height: 800
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'build', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

		if (process.env.NODE_ENV === 'development') {
			win.loadURL(url.format({
				pathname: path.join(__dirname, 'static', 'index.html'),
				protocol: 'file:',
				slashes: true
			}))
		}

    win.webContents.openDevTools()
    // to clear hardware info refresh interval, save id here
    win.intervalId = null;

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
})

app.on('activate', () => {
})