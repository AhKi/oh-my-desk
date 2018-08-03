import { autoUpdater } from 'electron-updater';
import store from 'store/storeMain';
import {
  updateCheckRequest,
  updateDownloadProgress,
  updateDownloadRequest,
  updateInstallingDownloaded,
} from 'actions/update';
import {
  progressWindowIdSelector,
  skipVersionSelector,
  isAutoUpdateSelector,
  isAutoCheckUpdateSelector,
  isRestartAfterUpdateSelector,
  isUpdateCheckOnManualSelector,
} from 'store/share/update/selectors';
import openUpdateWindow from 'utils/process/update/openUpdateWindow';


function autoUpdateConfig() {
  const state = store.getState();
  const isAutoUpdate = isAutoUpdateSelector(state);
  const isAutoCheckUpdate = isAutoCheckUpdateSelector(state);
  const isUpdateCheckOnManual = isUpdateCheckOnManualSelector(state);

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('download-progress', (downloadObj) => {
    const id = progressWindowIdSelector(store.getState());

    store.dispatch(updateDownloadProgress(downloadObj, id));
  });

  autoUpdater.on('update-available', (updateInfo) => {
    const skipVersion = skipVersionSelector(state);
    const nextVersion = updateInfo.version;

    if (isUpdateCheckOnManual) {
      openUpdateWindow();
    } else if (isAutoUpdate) {
      store.dispatch(updateDownloadRequest());
    } else if (skipVersion !== nextVersion) {
      openUpdateWindow();
    }
  });

  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'ahki',
    protocol: 'https',
    repo: 'oh-my-desk',
  });

  const isInstalling = isRestartAfterUpdateSelector(state);
  if (!isInstalling) {
    if (isAutoUpdate || isAutoCheckUpdate) {
      store.dispatch(updateCheckRequest());
    }
  } else {
    store.dispatch(updateInstallingDownloaded());
  }
}

export default autoUpdateConfig;
