import { remote, globalShortcut } from 'electron';

function handlingSearchHotKey(key) {
  if (!remote) {
    const TrayMenuBar = require('main/utils/menu/trayMenuBar').default; // eslint-disable-line global-require
    globalShortcut.unregisterAll();
    globalShortcut.register(key, () => {
      if (TrayMenuBar.window && TrayMenuBar.window.isFocused()) {
        TrayMenuBar.window.blur(); // Need to reopen in windowOS
        TrayMenuBar.hideWindow(); // Need to reopen in macOS
      } else {
        TrayMenuBar.showWindow();
      }
    });
  }
}

export default handlingSearchHotKey;
