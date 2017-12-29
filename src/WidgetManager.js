const { BrowserWindow } = require('electron')
const Store = require('./Store')
const uuid = require('uuid/v4')

class WidgetManager {
  constructor() {
    this.windows = [];
    this.widgetStore = new Store({
      configName: 'widgets',
      defaults: []
    })

    // this is consumers of observer pattern
    // createObserver will be passed widget information
    this.createObserver = [this.openWindow.bind(this)];
    this.updateObserver = [];
    // deleteObserver will be passed widget id which be deleted
    this.deleteObserver = [];
  }

  create(widget) {
    widget.id = uuid();
    this.widgetStore.set(widget.id, widget)

    this.createObserver.forEach((o) => o(widget))
  }

  update(widget) {
    this.widgetStore.set(widget.id, widget)
  }

  delete(id) {
    this.widgetStore.delete(id)
    this.windows[id].close()
    delete this.windows[id]
  }

  getWidgets() {
    return this.widgetStore.getAll();
  }

  openAllWindow() {
    let widgets = this.widgetStore.getAll();

    for (let label in widgets) {
      this.openWindow(widgets[label])
    }
  }

  openWindow(opt) {
    if (!opt.isActive) return;
    if (this.windows[opt.id]) {
      this.windows[opt.id].focus();
      return;
    }

    let win = new BrowserWindow({
        title: opt.name,
        x: opt.position.x,
        y: opt.position.y,
        width: opt.size.width,
        height: opt.size.height,
        alwaysOnTop: opt.isOnTop,
        autoHideMenuBar: true,
        skipTaskbar: true,
        show: false
    })
  
    if (opt.type === 'web') {
        win.loadURL(opt.url, {userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Mobile Safari/537.36'})
    } else {
        // some code creating window for native widget
    }

    win.webContents.on('did-finish-load', () => {
      win.setTitle(opt.name)
    })

    win.once('ready-to-show', () => {
      win.show()
    })
  
    win.on('closed', () => {
        win = null
    })

    win.on('move', (() => {
      let position = win.getPosition();

      opt.position.x = position[0];
      opt.position.y = position[1];

      this.widgetStore.set(opt.id, opt);
    }).bind(this))
  
    this.windows[opt.id] = win
  }

  buildTrayContextMenuTemplate() {
    let menuTemplate = [];
    let widgets = this.getWidgets()

    menuTemplate.push({label: 'Apps', type: 'normal'})

    for (let label in widgets) {
      let element = widgets[label];

      menuTemplate.push({
        label: element.name,
        type: 'normal',
        click: (() => { this.openWindow(element) }).bind(this)
      })
    }

    return menuTemplate
  }
}

module.exports = WidgetManager