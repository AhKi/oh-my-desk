import { createActions } from 'redux-actions';
import * as TYPES from '../actionTypes';
import * as CATEGORY from '../category';

export const {
  updateCheckRequest,
  updateCheckSuccess,
  updateCheckFailure,
} = createActions({
  [TYPES.UPDATE_CHECK_REQUEST]: [
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_CHECK_SUCCESS]: [
    (version, releaseNotes) => ({ version, releaseNotes }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_CHECK_FAILURE]: [
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
});

export const {
  updateDownloadRequest,
  updateDownloadSuccess,
  updateDownloadFailure,
  updateDownloadProgress,
} = createActions({
  [TYPES.UPDATE_DOWNLOAD_REQUEST]: [
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_DOWNLOAD_SUCCESS]: [
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_DOWNLOAD_FAILURE]: [
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_DOWNLOAD_PROGRESS]: [
    obj => ({ downloadObj: obj }),
    (obj, id) => ({
      category: CATEGORY.TARGET,
      target: [id],
      containMain: true,
    }),
  ],
});

export const {
  updateSkipThisVersion,
  updateProgressCancel,
  updateSetAutoCheckUpdate,
  updateSetAutoUpdate,
  updateSetNotAuto,
  updateInstallingDownloaded,
} = createActions({
  [TYPES.UPDATE_SKIP_THIS_VERSION]: [
    version => ({ version }),
    () => ({
      category: CATEGORY.TARGET,
      self: false,
      containMain: true,
    }),
  ],
  [TYPES.UPDATE_PROGRESS_CANCEL]: [
    () => {},
    () => ({
      category: CATEGORY.TARGET,
      self: false,
      containMain: true,
    }),
  ],
  [TYPES.UPDATE_SET_AUTO_CHECK_UPDATE]: [
    isAutoCheckUpdate => ({ isAutoCheckUpdate }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_SET_AUTO_UPDATE]: [
    isAutoUpdate => ({ isAutoUpdate }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_SET_NOT_AUTO]: [
    () => {},
    () => {},
  ],
  [TYPES.UPDATE_INSTALLING_DOWNLOADED]: [
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
});

export const {
  updateProgressWindowOpen,
  updateProgressWindowClose,
} = createActions({
  [TYPES.UPDATE_PROGRESS_WINDOW_OPEN]: [
    (id, win) => ({ id, win }),
    () => ({
      category: CATEGORY.TARGET,
      self: false,
      containMain: true,
    }),
  ],
  [TYPES.UPDATE_PROGRESS_WINDOW_CLOSE]: [
    id => ({ id }),
    () => ({
      category: CATEGORY.TARGET,
      self: false,
      containMain: true,
    }),
  ],
});
