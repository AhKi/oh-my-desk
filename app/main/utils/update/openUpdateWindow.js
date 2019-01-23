import { BrowserWindow } from 'electron';
import { UPDATE_WINDOW_PATH } from 'config';

const openUpdateWindow = () => {
  const updateWindow = new BrowserWindow({
    width: 700,
    height: 400,
    resizable: false,
    show: true,
    webPreferences: {
      devTools: process.env.NODE_ENV === 'development',
    },
  });

  updateWindow.loadURL(UPDATE_WINDOW_PATH);
};

export default openUpdateWindow;
