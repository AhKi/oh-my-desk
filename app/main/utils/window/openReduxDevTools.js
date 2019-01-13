import { BrowserView, BrowserWindow } from 'electron';

/**
 * For main process redux-store, pop up redux-devtools window.
 */
function openReduxDevTools() {
  if (!process.env.IS_DEVTOOLS) {
    return;
  }

  const devToolsWin = new BrowserWindow({ title: 'main process redux-devtools', width: 500, height: 500 });
  const devToolsView = new BrowserView();
  devToolsWin.setBrowserView(devToolsView);
  devToolsView.setBounds({
    x: 0,
    y: 0,
    width: 500,
    height: 480,
  });
  devToolsView.setAutoResize({ width: true, height: true });
  devToolsView.webContents.loadURL('http://remotedev.io/local/');
}

export default openReduxDevTools;
