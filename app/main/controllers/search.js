import { app, dialog } from 'electron';
import * as TYPES from 'actions/constant/actionTypes';
import TrayBar from 'main/utils/menu/trayMenuBar';
import * as PATH from 'constants/path';
import i18n from 'constants/i18n';

const searchController = (action) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.SEARCH_WINDOW_HIDE: {
      TrayBar.hideWindow();
      break;
    }
    case TYPES.SEARCH_APP_QUIT: {
      const text = i18n().search;
      const options = {
        type: 'info',
        title: text.quit,
        message: text.quitMessage,
        buttons: [text.ok, text.cancel],
        icon: PATH.LOGO_ICON_PATH,
      };
      dialog.showMessageBox(options, (index) => {
        const isYesBtn = index === 0;

        if (isYesBtn) {
          app.quit();
        }
      });
      break;
    }
  }
};

export default searchController;
