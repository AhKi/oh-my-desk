const { BrowserWindow } = require('electron');
const Store = require('./Store');
const uuid = require('uuid/v4');
const url = require('url');
const path = require('path');
const moment = require('moment');

class WidgetManager {
  constructor(option) {
    this.windows = [];
    this.widgetStore = new Store({ configName: 'widgets', defaults: {} });
    this.iconPath = option.icon;
    this.settingWin = null;
    this.isFirstTime = (this.widgetStore.count() === 0);

    // this is consumers of observer pattern createObserver will be passed widget
    // information
    this.createObserver = [
      this.openWindow.bind(this),
    ];
    this.updateObserver = [
      this.updateWindow.bind(this),
    ];
    // deleteObserver will be passed widget id which be deleted
    this.deleteObserver = [];
  }

  setSettingWin(win) {
    this.settingWin = win;
  }

  callTargetEvent(eventName, widgetId) {
    const targetWidget = this.windows[widgetId];

    if (targetWidget) {
      targetWidget[eventName]();
    }
  }

  create(_widget) {
    const widget = _widget;
    widget.id = uuid();
    widget.createTime = moment().format('YYYY-MM-DDTHH:mm:ss');
    widget.updateTime = moment().format('YYYY-MM-DDTHH:mm:ss');
    this.widgetStore.set(widget.id, widget);

    this.createObserver.forEach((o) => { o(widget); });
  }

  update(widget) {
    const originWidget = this.widgetStore.get(widget.id);

    if (widget.url && originWidget.url !== widget.url) {
      this.windows[widget.id].close();
      this.openWindow(widget);
    }

    Object.assign(originWidget, widget);

    originWidget.updateTime = moment().format('YYYY-MM-DDTHH:mm:ss');
    this.widgetStore.set(widget.id, originWidget);
    this.sendToSettingWindow(this.widgetStore.data);
    this.updateObserver.forEach((o) => { o(originWidget); });
  }

  delete(id) {
    this.widgetStore.delete(id);
    if (this.windows[id]) {
      this.windows[id].close();
      delete this.windows[id];
    }

    this.deleteObserver.forEach((o) => { o(id); });
  }

  getWidgets() {
    return this.widgetStore.getAll();
  }

  openAllWindow() {
    const widgets = this.widgetStore.getAll();
    const keys = Object.keys(widgets);
    const values = Object.values(widgets);

    for (let i = 0; i < keys.length; i += 1) {
      this.openWindow(values[i]);
    }
  }

  openWindow(opt) {
    if (!opt.isActive) {
      return;
    }

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
      show: false,
      frame: false,
      icon: this.iconPath,
    });

    if (opt.type === 'web') {
      // win.loadURL(opt.url, {userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5
      // Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113
      // Mobile Safari/537.36'})
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'static', 'index.html'),
        protocol: 'file:',
        slashes: true,
      }));
    } else {
      // some code creating window for native widget
    }

    win.webContents.on('did-finish-load', () => {
      win.setTitle(opt.name);
      win.webContents.send('widget-info', opt);
    });

    win.once('ready-to-show', () => {
      win.show();
    });

    win.on('closed', () => {
      win = null;
      delete this.windows[opt.id];
    });

    win.on('close', () => {
      const _opt = this.widgetStore.get(opt.id);
      _opt.isActive = false;

      this.widgetStore.set(_opt.id, _opt);
      win.webContents.send('widget-info', _opt);
      this.sendToSettingWindow(this.widgetStore.data);
    });

    win.on('move', (() => {
      const position = win.getPosition();
      const _opt = this.widgetStore.get(opt.id);

      [_opt.position.x, _opt.position.y] = position;

      this.widgetStore.set(_opt.id, _opt);
      win.webContents.send('widget-info', _opt);
      this.sendToSettingWindow(this.widgetStore.data);
    }));

    win.on('resize', (() => {
      const size = win.getSize();
      const _opt = this.widgetStore.get(opt.id);

      [_opt.size.width, _opt.size.height] = size;

      this.widgetStore.set(_opt.id, _opt);
      win.webContents.send('widget-info', _opt);
      this.sendToSettingWindow(this.widgetStore.data);
    }));
    this.windows[opt.id] = win;
  }

  sendToSettingWindow(info) {
    if (this.settingWin) {
      this.settingWin.webContents.send('WIDGET_INFO_RESULT', info);
    }
  }

  updateWindow(widget) {
    const widgetWindow = this.windows[widget.id];

    if (widget.isActive && widgetWindow) {
      widgetWindow.focus();
    }
    if (widget.isActive && !widgetWindow) {
      this.openWindow(widget);
      return;
    }
    if (!widget.isActive) {
      if (widgetWindow) widgetWindow.close();
      return;
    }

    // size
    widgetWindow.setSize(
      widget.size.width,
      widget.size.height,
    );
    // position
    widgetWindow.setPosition(
      widget.position.x,
      widget.position.y,
    );
    // always on top
    widgetWindow.setAlwaysOnTop(widget.isOnTop);

    widgetWindow.webContents.send('widget-info', widget);
  }

  onUpdateTray(callback) {
    function funcWrapper() {
      callback(this.buildTrayContextMenuTemplate());
    }

    funcWrapper.bind(this)();

    this.createObserver.push(funcWrapper.bind(this));
    this.updateObserver.push(funcWrapper.bind(this));
    this.deleteObserver.push(funcWrapper.bind(this));
  }

  buildTrayContextMenuTemplate() {
    const menuTemplate = [];
    const widgets = this.getWidgets();
    const keys = Object.keys(widgets);
    const values = Object.values(widgets);
    let element = null;

    function openWindow(widget) {
      this.openWindow(widget);
    }

    for (let i = 0; i < keys.length; i += 1) {
      element = values[i];

      menuTemplate.push({
        label: element.name,
        type: 'normal',
        click: openWindow.bind(this, element),
      });
    }

    return menuTemplate;
  }
}

module.exports = WidgetManager;
