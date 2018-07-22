import { app, globalShortcut } from 'electron';
import menuBar from 'menubar';
import url from 'url';
import store from 'store/storeMain';
import {
  trayWindowClose,
  trayWindowOpen,
} from 'actions/status';
import * as PATH from 'constants/path';

const trayMenuBar = menuBar({
  icon: PATH.TRAY_ICON_PATH,
  index: url.format({
    pathname: PATH.SEARCH_PATH,
    protocol: 'file:',
    slashes: true,
  }),
  showDockIcon: true,
  tooltip: `oh-my-desk ${app.getVersion()}`,
});

trayMenuBar.on('show', () => {
  globalShortcut.register('Escape', () => {
    if (trayMenuBar.window && trayMenuBar.window.isFocused()) {
      trayMenuBar.hideWindow();
    }
  });
  store.dispatch(trayWindowOpen());
});

trayMenuBar.on('hide', () => {
  store.dispatch(trayWindowClose());
  globalShortcut.unregister('Escape');
});

export default trayMenuBar;
