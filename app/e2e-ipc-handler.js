import { ipcMain } from 'electron';
import { showSearch, hideSearch } from 'main/utils/window/search';

function e2eIpcHandler() {
  ipcMain.on('search.window.open', () => {
    showSearch();
  });

  ipcMain.on('search.window.close', () => {
    hideSearch();
  });
}

export default e2eIpcHandler;
