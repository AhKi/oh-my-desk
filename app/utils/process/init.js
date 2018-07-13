import autoLaunch from 'utils/autoLaunch';
import createTray from 'utils/process/createTray';
import createMenu from 'utils/process/createMenu';
import openAllWidgetStatusOpen from 'utils/process/openAllWidgetStatusOpen';
import store from 'store/storeMain';
import subscribeActionMain from 'store/utils/subscribeActionMain';

function init() {
  subscribeActionMain(store);
  openAllWidgetStatusOpen();
  createMenu();
  createTray();

  if (process.env.NODE_ENV !== 'development') {
    autoLaunch();
  }
}

export default init;
