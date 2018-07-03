export default jest.fn();

export const webContents = {
  getAllWebContents: jest.fn(() => []),
};

export const ipcMain = {
  on: jest.fn(),
};

export const BrowserWindow = jest.fn(() => ({
  close: jest.fn(),
  loadURL: jest.fn(),
  once: jest.fn(),
  on: jest.fn(),
  setAlwaysOnTop: jest.fn(),
  show: jest.fn(),
}));

export const ipcRenderer = {
  on: jest.fn(),
  send: jest.fn(),
};

export const remote = {
  getGlobal: jest.fn(),
};