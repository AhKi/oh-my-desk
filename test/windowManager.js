const windowManager = app => ({
  searchWindowOpen: async () => {
    await app.webContents.executeJavaScript(`
     const { ipcRenderer } = require('electron');
    `);
    await app.webContents.executeJavaScript(`
      ipcRenderer.send('search.window.open');
    `);
  },
  searchWindowClose: async () => {
    await app.webContents.executeJavaScript(`
     const { ipcRenderer } = require('electron');
    `);
    await app.webContents.executeJavaScript(`
      ipcRenderer.send('search.window.close');
    `);
  },
});

export default windowManager;
