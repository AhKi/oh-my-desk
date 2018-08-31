import { BrowserWindow } from 'electron';
import url from 'url';
import * as PATH from 'constants/path';

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

  updateWindow.loadURL(url.format({
    pathname: PATH.UPDATE_WINDOW_PATH,
    protocol: 'file:',
    slashes: true,
  }));
};

export default openUpdateWindow;
