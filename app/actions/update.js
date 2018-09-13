import { createActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';
import * as CATEGORY from 'actions/constant/actionCategory';

export const {
  updateCheckRequest,
  updateCheckRequestOnManual,
  updateCheckSuccess,
  updateCheckFailure,
  updateDownloadRequest,
  updateDownloadSuccess,
  updateDownloadFailure,
  updateDownloadProgress,
  updateInstallingDownloaded,
  updateProgressCancel,
  updateProgressWindowOpen,
  updateProgressWindowClose,
  updateSetAutoCheckUpdate,
  updateSetAutoUpdate,
  updateSkipThisVersion,
} = createActions({
  [TYPES.UPDATE_CHECK_REQUEST]: [
    /**
     * Request API fetch if exist new version of update automatically when start app.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_CHECK_REQUEST_ON_MANUAL]: [
    /**
     * Request API fetch if exist new version of update manually when click check button.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_CHECK_SUCCESS]: [
    /**
     * Complete update check.
     */
    (version, releaseNotes) => ({ version, releaseNotes }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_CHECK_FAILURE]: [
    /**
     * Failure update check.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_DOWNLOAD_REQUEST]: [
    /**
     * Request API fetch new download update file.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_DOWNLOAD_SUCCESS]: [
    /**
     * Success API fetch new download update file.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_DOWNLOAD_FAILURE]: [
    /**
     * Failure API fetch new download update file.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_DOWNLOAD_PROGRESS]: [
    /**
     * Get update download information at real time.
     * @param:Object obj: information about download like remain file size and download speed.
     * @returns {{downloadObj : *}}
     */
    obj => ({ downloadObj: obj }),
    (obj, id) => ({
      category: CATEGORY.TARGET,
      target: [id],
      containMain: true,
    }),
  ],
  [TYPES.UPDATE_INSTALLING_DOWNLOADED]: [
    /**
     * Update is Installed but it doesn't install yet.
     * TODO:
     * Update file doesn't install immediately in macOS.
     * So check this boolean because don't do update check of duplicate.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_PROGRESS_CANCEL]: [
    /**
     * Cancel download process.
     */
    () => {},
    () => ({
      category: CATEGORY.TARGET,
      self: false,
      containMain: true,
    }),
  ],
  [TYPES.UPDATE_PROGRESS_WINDOW_OPEN]: [
    /**
     * Open window about download process window.
     * @param:String id: identification of window download process window.
     * @param:BrowserWindow win: Electron BrowserWindow Object of download process window
     * @returns {{id : *, win : *}}
     */
    (id, win) => ({ id, win }),
    () => ({
      category: CATEGORY.TARGET,
      self: false,
      containMain: true,
    }),
  ],
  [TYPES.UPDATE_PROGRESS_WINDOW_CLOSE]: [
    /**
     * Close window about download process window.
     * @param:String id: identification of window download process window.
     * @returns {{id : *}}
     */
    id => ({ id }),
    () => ({
      category: CATEGORY.TARGET,
      self: false,
      containMain: true,
    }),
  ],
  [TYPES.UPDATE_SET_AUTO_CHECK_UPDATE]: [
    /**
     * Set about update auto check.
     * @param:Boolean isCheckUpdateWhenStart: next value about check update.
     * @returns {{isCheckUpdateWhenStart : *}}
     */
    isCheckUpdateWhenStart => ({ isCheckUpdateWhenStart }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_SET_AUTO_UPDATE]: [
    /**
     * Set about update auto download.
     * @param:Boolean isDownloadUpdateWhenStart: next value about download update.
     * @returns {{isDownloadUpdateWhenStart : *}}
     */
    isDownloadUpdateWhenStart => ({ isDownloadUpdateWhenStart }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_SKIP_THIS_VERSION]: [
    /**
     * Set skip version about update.
     * @param:String version: skip version about update.
     * @returns {{version : *}}
     */
    version => ({ version }),
    () => ({
      category: CATEGORY.TARGET,
      self: false,
      containMain: true,
    }),
  ],
});
