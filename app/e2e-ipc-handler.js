import { ipcMain } from 'electron';
import TrayMenuBar from 'main/utils/menu/trayMenuBar';

function e2eIpcHandler() {
  ipcMain.on('search.window.open', () => {
    TrayMenuBar.showWindow();
  });

  ipcMain.on('search.window.close', () => {
    TrayMenuBar.hideWindow();
  });
}

export default e2eIpcHandler;
