export default jest.fn();

export const webContents = {
  getAllWebContents: jest.fn(() => []),
};

export const ipcMain = {
  on: jest.fn(),
};

export const BrowserWindow = jest.fn(info => ({
  close: jest.fn(),
  loadURL: jest.fn(),
  once: jest.fn(),
  on: jest.fn(),
  setAlwaysOnTop: jest.fn(),
  show: jest.fn(),
  showInactive: jest.fn(),
  getContentBounds: jest.fn(() => ({
    x: info.x,
    y: info.y,
    height: info.height,
    width: info.width,
  })),
  webContents: {
    on: jest.fn(),
    send: jest.fn(),
    openDevTools: jest.fn(),
  },
}));

export const ipcRenderer = {
  on: jest.fn(),
  send: jest.fn(),
};

export const remote = {
  getGlobal: jest.fn(),
  getCurrentWindow: jest.fn(),
  Menu: {
    buildFromTemplate: jest.fn(() => ({
      popup: jest.fn(),
    })),
  },
  app: {
    getVersion: jest.fn(),
  },
};

export const shell = {
  openExternal: jest.fn(),
};

export const app = {
  getName: jest.fn(() => 'oh-my-desk'),
  getPath: jest.fn(arg => arg),
  getVersion: jest.fn(),
  getAppPath: jest.fn(() => 'mock-path'),
  isReady: jest.fn(),
  on: jest.fn(),
};

export const Menu = {
  buildFromTemplate: jest.fn(() => ({
    popup: jest.fn(),
  })),
  setApplicationMenu: jest.fn(),
};

export const globalShortcut = {
  register: jest.fn(),
  unregister: jest.fn(),
};
