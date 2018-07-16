import { app, globalShortcut } from 'electron';
import menuBar from 'menubar';
import url from 'url';
import * as PATH from 'constants/path';

const trayMenuBar = menuBar({
  icon: PATH.TRAY_ICON_PATH,
  index: url.format({
    pathname: PATH.SETTING_PATH,
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
});

trayMenuBar.on('hide', () => {
  globalShortcut.unregister('Escape');
});

export default trayMenuBar;
