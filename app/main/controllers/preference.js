import { autoUpdater } from 'electron-updater';
import { CancellationToken } from 'electron-builder-http';
import store from 'store/storeMain';
import * as TYPES from 'actions/constant/actionTypes';
import autoLaunch from 'main/utils/window/autoLaunch';
import createMenu from 'main/utils/menu/createMenu';
import {
  updateCheckSuccess,
  updateCheckFailure,
  updateDownloadSuccess,
  updateDownloadFailure,
} from 'actions/update';
import openUpdateProgress from 'main/utils/update/openUpdateProgress';

let cancellationToken;

const preferenceController = (action) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.TOGGLE_OPEN_APP_WHEN_LOGIN: {
      autoLaunch();
      break;
    }
    case TYPES.SET_LANGUAGE_ENGLISH:
    case TYPES.SET_LANGUAGE_KOREAN: {
      createMenu();
      break;
    }
    case TYPES.UPDATE_CHECK_REQUEST:
    case TYPES.UPDATE_CHECK_REQUEST_ON_MANUAL: {
      autoUpdater.checkForUpdates()
        .then((data) => {
          const { version: nextVersion, releaseNotes } = data.updateInfo;
          store.dispatch(updateCheckSuccess(nextVersion, releaseNotes));
        })
        .catch((err) => {
          store.dispatch(updateCheckFailure(err));
        });
      break;
    }
    case TYPES.UPDATE_DOWNLOAD_REQUEST: {
      openUpdateProgress();
      cancellationToken = new CancellationToken();
      autoUpdater.downloadUpdate(cancellationToken)
        .then(() => {
          store.dispatch(updateDownloadSuccess());
        })
        .catch((err) => {
          store.dispatch(updateDownloadFailure(err));
        });
      break;
    }
    case TYPES.UPDATE_PROGRESS_CANCEL: {
      cancellationToken.cancel();
      break;
    }
  }
};

export default preferenceController;
