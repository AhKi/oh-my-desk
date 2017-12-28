const { BrowserWindow } = require('electron')
const Store = require('./Store')

class WidgetManager {
  constructor() {
    this.windows = [];
    this.widgetStore = new Store({
      configName: 'widgets',
      defaults: []
    })
  }

  
  createWidgets() {
    this.widgetStore.getAll().forEach(each => {
        this.createWidget(each)
    })
  }

  createWidget(opt) {
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
  
    this.windows[opt.id] = win
  }
}

module.exports = WidgetManager