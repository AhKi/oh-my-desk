const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const {ipcMain} = require('electron')

let win

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

    win = new BrowserWindow({
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
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
})