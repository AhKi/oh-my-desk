import { app, Menu, Tray } from 'electron';
import openPreference from 'utils/process/openPreference';
import * as PATH from 'constants/path';

function createTray() {
  const tray = new Tray(PATH.TRAY_ICON_PATH);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Setting', type: 'normal', click: openPreference },
    {
      label: 'Exit',
      type: 'normal',
      click: app.quit,
    },
  ]);

  tray.setToolTip('oh-my-desk');
  tray.setContextMenu(contextMenu);
}

export default createTray;
