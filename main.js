const {app, BrowserWindow, Menu, Tray} = require('electron')
const path = require('path')
const url = require('url')
const {ipcMain} = require('electron')
const WidgetManager = require('./src/WidgetManager')
let setting_win
let widgetManager = new WidgetManager()

function init() {
    tray = new Tray(path.join(__dirname, 'resource', 'icon.png'))
    const contextMenu = Menu.buildFromTemplate([
      {label: 'Setting', type: 'normal', click: createSetting},
      {label: 'Exit', type: 'normal', click: function() {
          app.quit();
      }}
    ])
    tray.setToolTip('Oh My Desk')
    tray.setContextMenu(contextMenu)

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
}

function createSetting() {
    if (setting_win) return

    setting_win = new BrowserWindow({
        width: 800,
        height: 800
    })

    if (process.env.NODE_ENV === 'development') {
        setting_win.loadURL(url.format({
            pathname: path.join(__dirname, 'static', 'index.html'),
            protocol: 'file:',
            slashes: true
        }))
        
        setting_win.webContents.openDevTools()
    } else {
        setting_win.loadURL(url.format({
            pathname: path.join(__dirname, 'build', 'index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }

    setting_win.on('closed', () => {
        setting_win = null
    })
}

app.on('ready', init)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
})