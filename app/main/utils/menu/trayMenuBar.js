import { app, globalShortcut } from 'electron';
import menuBar from 'menubar';
import url from 'url';
import store from 'store/storeMain';
import {
  searchTrayClose,
  searchTrayOpen,
} from 'actions/search';
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
  fullscreenable: false,
  resizable: false,
});

trayMenuBar.on('show', () => {
  globalShortcut.register('Escape', () => {
    if (trayMenuBar.window && trayMenuBar.window.isFocused()) {
      trayMenuBar.window.blur(); // Need to reopen in windowOS
      trayMenuBar.hideWindow(); // Need to reopen in macOS
    }
  });
  store.dispatch(searchTrayOpen());
});

trayMenuBar.on('hide', () => {
  store.dispatch(searchTrayClose());
  globalShortcut.unregister('Escape');
});

export default trayMenuBar;
