import AutoLaunch from 'auto-launch';
import store from 'store/storeMain';
import { isLaunchAppWhenLoginSelector } from 'store/reducers/share/status/selectors';

/**
 * Auto Launch oh-my-desk when boot.
 * Use node-auto-launch
 * https://github.com/Teamwork/node-auto-launch
 */
function autoLaunch() {
  const isLaunchAppWhenLogin = isLaunchAppWhenLoginSelector(store.getState());
  const OhMyDeskAutoLauncher = new AutoLaunch({
    name: 'oh-my-desk',
    mac: {
      useLaunchAgent: true,
    },
  });

  OhMyDeskAutoLauncher.isEnabled()
    .then((isEnable) => {
      if (isLaunchAppWhenLogin && !isEnable) {
        OhMyDeskAutoLauncher.enable();
      } else if (!isLaunchAppWhenLogin && isEnable) {
        OhMyDeskAutoLauncher.disable();
      }
    });
}

export default autoLaunch;
