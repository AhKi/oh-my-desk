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
} from 'store/share/update/selectors';
import openUpdateWindow from 'utils/process/update/openUpdateWindow';


function autoUpdateConfig() {
  const state = store.getState();
  const isAutoUpdate = isAutoUpdateSelector(state);
  const isAutoCheckUpdate = isAutoCheckUpdateSelector(state);

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('download-progress', (downloadObj) => {
    const id = progressWindowIdSelector(store.getState());

    store.dispatch(updateDownloadProgress(downloadObj, id));
  });

  autoUpdater.on('update-available', (updateInfo) => {
    const skipVersion = skipVersionSelector(state);
    const nextVersion = updateInfo.version;

    if (isAutoUpdate) {
      store.dispatch(updateDownloadRequest());
    } else if (!isAutoCheckUpdate || (
      isAutoCheckUpdate && skipVersion !== nextVersion)
    ) {
      openUpdateWindow();
    }
  });

  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'hyunmoahn',
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
