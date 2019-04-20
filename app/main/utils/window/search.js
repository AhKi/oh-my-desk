import menuBar from 'menubar';
import { APP_VERSION, SEARCH_PATH, TRAY_ICON_PATH } from 'config';
import { globalShortcut, Menu } from 'electron';
import i18n from 'constants/i18n';
import { openPreference } from 'main/utils/window/preference';

export const search = menuBar({
  icon: TRAY_ICON_PATH,
  index: SEARCH_PATH,
  showDockIcon: true,
  tooltip: `oh-my-desk ${APP_VERSION}`,
  fullscreenable: false,
  resizable: false,
  height: 460,
});

export function showSearch() {
  search.showWindow();
}

export function hideSearch() {
  /**
   * To hide tray window of menubar(Tray window),
   * Need to below both logic.
   *
   * windowOS need to `search.window.blur()` to hide menubar.
   * macOS need to `search.hideWindow()`.
   */
  if (search.window) {
    search.window.blur(); // Need to reopen in windowOS
  }
  search.hideWindow(); // Need to reopen in macOS
}

export function toggleSearch() {
  if (search.window && search.window.isFocused()) {
    hideSearch();
  } else {
    showSearch();
  }
}

export function contextMenuOnTray() {
  const { tray } = search;
  const text = i18n().menu;

  tray.popUpContextMenu(Menu.buildFromTemplate([
    { label: text.preference, click: openPreference },
    { type: 'separator' },
    { label: text.open, click: () => tray.showWindow() },
    { label: text.quit, role: 'quit' },
  ]));
}

search.on('show', () => {
  globalShortcut.register('Escape', hideSearch);
  search.window.webContents.send('tray.show');
});
search.on('hide', () => {
  globalShortcut.unregister('Escape');
  search.window.webContents.send('tray.hide');
});
search.on('after-close', () => globalShortcut.unregister('Escape'));
search.on('ready', () => {
  search.tray.on('right-click', contextMenuOnTray);
});
