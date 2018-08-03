import { autoUpdater } from 'electron-updater';
import { CancellationToken } from 'electron-builder-http';
import store from 'store/storeMain';
import openPreference from 'utils/process/openPreference';
import * as TYPES from 'actions/actionTypes';
import autoLaunch from 'utils/autoLaunch';
import createMenu from 'utils/process/createMenu';
import {
  updateCheckSuccess,
  updateCheckFailure,
  updateDownloadSuccess,
  updateDownloadFailure,
} from 'actions/update';
import openUpdateProgress from 'utils/process/update/openUpdateProgress';

let cancellationToken;

const preferenceController = (action) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.OPEN_PREFERENCE: {
      openPreference();
      break;
    }
    case TYPES.TOGGLE_AUTO_LAUNCH: {
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
