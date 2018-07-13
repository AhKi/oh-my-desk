import AutoLaunch from 'auto-launch';

/**
 * Auto Launch oh-my-desk when boot.
 * Use node-auto-launch
 * https://github.com/Teamwork/node-auto-launch
 */
function autoLaunch() {
  const OhMyDeskAutoLauncher = new AutoLaunch({
    name: 'oh-my-desk',
    mac: {
      useLaunchAgent: true,
    },
  });

  if (!OhMyDeskAutoLauncher.isEnabled()) {
    OhMyDeskAutoLauncher.enable();
  }
}

export default autoLaunch;
