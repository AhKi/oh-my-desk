import AutoLaunch from 'auto-launch';
import store from 'store/storeMain';
import { autoLaunchSelector } from 'store/share/status/selectors';

/**
 * Auto Launch oh-my-desk when boot.
 * Use node-auto-launch
 * https://github.com/Teamwork/node-auto-launch
 */
function autoLaunch() {
  const isAutoLaunch = autoLaunchSelector(store.getState());
  const OhMyDeskAutoLauncher = new AutoLaunch({
    name: 'oh-my-desk',
    mac: {
      useLaunchAgent: true,
    },
  });

  OhMyDeskAutoLauncher.isEnabled()
    .then((isEnable) => {
      if (isAutoLaunch && !isEnable) {
        OhMyDeskAutoLauncher.enable();
      } else if (!isAutoLaunch && isEnable) {
        OhMyDeskAutoLauncher.disable();
      }
    });
}

export default autoLaunch;
