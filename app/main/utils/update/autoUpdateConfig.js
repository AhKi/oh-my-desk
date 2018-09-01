import { autoUpdater } from 'electron-updater';
import store from 'store/storeMain';
import {
  updateCheckRequest,
  updateDownloadProgress,
  updateDownloadRequest,
  updateInstallingDownloaded,
} from 'actions/update';
import {
  isCheckUpdateWhenStartSelector,
  isDownloadUpdateWhenStartSelector,
  isRestartAfterUpdateSelector,
  isUpdateCheckOnManualSelector,
} from 'store/reducers/share/status/selectors';
import { skipVersionSelector } from 'store/reducers/share/config/selectors';
import { downloadProgressSelector } from 'store/reducers/share/identification/selectors';
import openUpdateWindow from 'main/utils/update/openUpdateWindow';


function autoUpdateConfig() {
  const isDownloadUpdateWhenStart = isDownloadUpdateWhenStartSelector(store.getState());
  const isCheckUpdateWhenStart = isCheckUpdateWhenStartSelector(store.getState());

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('download-progress', (downloadObj) => {
    const id = downloadProgressSelector(store.getState());

    store.dispatch(updateDownloadProgress(downloadObj, id));
  });

  autoUpdater.on('update-available', (updateInfo) => {
    const skipVersion = skipVersionSelector(store.getState());
    const nextVersion = updateInfo.version;
    const isUpdateCheckOnManual = isUpdateCheckOnManualSelector(store.getState());

    if (isUpdateCheckOnManual) {
      openUpdateWindow();
    } else if (isDownloadUpdateWhenStart) {
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

  const isInstalling = isRestartAfterUpdateSelector(store.getState());
  if (!isInstalling) {
    if (isDownloadUpdateWhenStart || isCheckUpdateWhenStart) {
      store.dispatch(updateCheckRequest());
    }
  } else {
    store.dispatch(updateInstallingDownloaded());
  }
}

export default autoUpdateConfig;
