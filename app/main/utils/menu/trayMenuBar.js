import { app, globalShortcut, Menu } from 'electron';
import menuBar from 'menubar';
import url from 'url';
import store from 'store/storeMain';
import {
  searchTrayClose,
  searchTrayOpen,
} from 'actions/search';
import * as PATH from 'constants/path';
import i18n from 'constants/i18n';
import openPreference from 'main/utils/window/openPreference';

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
  // resizable: false,
  height: 445,
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

trayMenuBar.on('after-close', () => {
  store.dispatch(searchTrayClose());
  globalShortcut.unregister('Escape');
});

trayMenuBar.on('ready', () => {
  const { tray } = trayMenuBar;
  const popUpContextMenuInTray = () => {
    const text = i18n().menu;

    tray.popUpContextMenu(Menu.buildFromTemplate([
      { label: text.preference, click: openPreference },
      { type: 'separator' },
      { label: text.open, click: () => trayMenuBar.showWindow() },
      { label: text.quit, role: 'quit' },
    ]));
  };

  tray.on('right-click', popUpContextMenuInTray);
});

export default trayMenuBar;
