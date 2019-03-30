import { ipcMain } from 'electron';
import { openPreference } from 'main/utils/window/preference';

function handleIPC() {
  ipcMain.on('preference.open', () => {
    openPreference();
  });
}

export default handleIPC;
