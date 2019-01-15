import { BrowserWindow } from 'electron';
import { v4 } from 'uuid';
import store from 'store/storeMain';
import { UPDATE_PROGRESS_PATH } from 'config';
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

  updateWindow.loadURL(UPDATE_PROGRESS_PATH);
};

export default openUpdateWindow;
