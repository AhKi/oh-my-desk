import { BrowserWindow } from 'electron';
import { PREFERENCE_PATH } from 'config';

export let preference = null; // eslint-disable-line import/no-mutable-exports

export function openPreference() {
  if (preference) {
    preference.show();
  } else {
    preference = new BrowserWindow({
      acceptFirstMouse: true,
      width: 500,
      height: 450,
      resizable: false,
      webPreferences: {
        devTools: process.env.NODE_ENV === 'development',
      },
    });

    preference.loadURL(PREFERENCE_PATH);
    preference.on('close', () => {
      preference = null;
    });
  }
}
