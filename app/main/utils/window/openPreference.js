import { BrowserWindow } from 'electron';
import { v4 } from 'uuid';
import url from 'url';
import store from 'store/storeMain';
import * as identificationSelector from 'store/reducers/share/identification/selectors';
import * as identification from 'store/reducers/personal/identification/selectors';
import { openBrowserWindow } from 'actions/window';
import * as preferenceAction from 'actions/preference';
import * as PATH from 'constants/path';

const openPreference = () => {
  const winId = identificationSelector.preferenceSelector(store.getState());
  let winPreference;

  if (winId) {
    const browserWindowById = identification.browserWindowByIdSelector(store.getState());
    winPreference = browserWindowById.get(winId);
    winPreference.show();
    return;
  }

  winPreference = new BrowserWindow({
    acceptFirstMouse: true,
    width: 500,
    height: 400,
    titleBarStyle: 'hidden',
    resizable: false,
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
    store.dispatch(preferenceAction.preferenceClose(id));
  });


  store.dispatch(preferenceAction.preferenceAllocateId(id));
  store.dispatch(openBrowserWindow(id, winPreference));
};

export default openPreference;
