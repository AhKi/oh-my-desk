export default jest.fn();

export const autoUpdater = {
  downloadUpdate: jest.fn(() => new Promise(() => {})),
  checkForUpdates: jest.fn(() => new Promise(() => {})),
  on: jest.fn(),
  setFeedURL: jest.fn(),
};
