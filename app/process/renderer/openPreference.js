import path from 'path';
import { BrowserWindow } from 'electron';
import { v4 } from 'uuid';
import url from 'url';
import store from 'store/storeMain';
import * as statusSelector from 'store/share/status/selectors';
import * as personalSelector from 'store/personal/selectors';
import * as statusActions from 'actions/status';
import * as PATH from 'constants/path';

const openPreference = () => {
  const winId = statusSelector.preferenceIdSelector(store.getState());
  let winPreference;


  if (winId) {
    const windowById = personalSelector.windowByIdSelector(store.getState());
    winPreference = windowById.get(winId);
    winPreference.show();
    return;
  }

  winPreference = new BrowserWindow({
    acceptFirstMouse: true,
    width: 960,
    height: 700,
    minWidth: 360,
    icon: path.join(__dirname, 'asset', 'icon.png'),
    webPreferences: {
      devTools: process.env.NODE_ENV === 'development',
    },
  });

  winPreference.loadURL(url.format({
    pathname: PATH.PREFERENCE_PATH,
    protocol: 'file:',
    slashes: true,
  }));

  if (process.env.NODE_ENV === 'development') {
    winPreference.webContents.openDevTools();
  }

  const id = v4();

  winPreference.on('close', () => {
    store.dispatch(statusActions.closePreference(id));
  });


  store.dispatch(statusActions.allocatePreferenceId(id));
  store.dispatch(statusActions.openBrowserWindow(id, winPreference));
};

export default openPreference;
