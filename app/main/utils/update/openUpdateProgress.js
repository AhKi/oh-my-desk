import { BrowserWindow } from 'electron';
import url from 'url';
import { v4 } from 'uuid';
import store from 'store/storeMain';
import * as PATH from 'constants/path';
import {
  updateProgressWindowOpen,
  updateProgressWindowClose,
} from 'actions/update';

const openUpdateWindow = () => {
  const updateWindow = new BrowserWindow({
    width: 500,
    height: 150,
    frame: false,
    show: true,
    webPreferences: {
      devTools: process.env.NODE_ENV === 'development',
    },
  });
  const id = v4();

  updateWindow.on('closed', () => {
    store.dispatch(updateProgressWindowClose(id));
  });

  store.dispatch(updateProgressWindowOpen(id, updateWindow));

  updateWindow.loadURL(url.format({
    pathname: PATH.UPDATE_PROGRESS_PATH,
    protocol: 'file:',
    slashes: true,
  }));
};

export default openUpdateWindow;
