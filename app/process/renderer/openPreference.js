import path from 'path';
import { BrowserWindow } from 'electron';
import url from 'url';
import store from 'store/storeMain';
import * as statusSelector from 'store/status/selectors';
import * as preferenceActions from 'actions/preference';
import * as PATH from 'constants/path';

const openPreference = () => {
  let winPreference = statusSelector.winPreferenceSelector(store.getState());

  if (winPreference) {
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

  winPreference.on('close', () => {
    store.dispatch(preferenceActions.closePreference());
  });

  store.dispatch(preferenceActions.openPreference(winPreference));
};

export default openPreference;
