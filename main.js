const {app, BrowserWindow, Menu, Tray} = require('electron')
const path = require('path')
const url = require('url')
const {ipcMain} = require('electron')
const store = require('./src/store')

let windows = [];
let setting_win

let widgetStore = new store({
    configName: 'widgets',
    defaults: [{
        id: 'test',
        type: 'web',
        name: '사전',
        url: 'http://m.dic.naver.com/',
        position: {
            x: 100,
            y: 100
        },
        size: {
            width: 300,
            height: 400
        },
        transparency: 0.7,
        isActive: true,
        isIcon : false,
        isOnTop : false,
        favicon : null
    }]
})

function createWidget(opt) {
    if (!opt.isActive) return;
    let win = new BrowserWindow({
        title: opt.name,
        x: opt.position.x,
        y: opt.position.y,
        width: opt.size.width,
        height: opt.size.height,
        alwaysOnTop: opt.isOnTop,
        autoHideMenuBar: true
    })

    if (opt.type === 'web') {
        win.loadURL(opt.url)
    } else {
        // some code creating window for native widget
    }

    win.on('closed', () => {
        win = null
    })

    windows[opt.id] = win
}

function createWidgets() {
    widgetStore.getAll().forEach(each => {
        createWidget(each)
    })
}

function init() {
    tray = new Tray(path.join(__dirname, 'resource', 'icon.png'))
    const contextMenu = Menu.buildFromTemplate([
      {label: 'Setting', type: 'normal', click: createSetting},
      {label: 'Exit', type: 'normal'}
    ])
    tray.setToolTip('Oh My Desk')
    tray.setContextMenu(contextMenu)

    createWidgets();
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
    if (win === null) {
        createWindows()
    }
})