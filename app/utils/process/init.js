import createTray from 'utils/process/createTray';
import createMenu from 'utils/process/createMenu';
import openAllWidgetStatusOpen from 'utils/process/openAllWidgetStatusOpen';
import store from 'store/storeMain';
import subscribeActionMain from 'store/utils/subscribeActionMain';

function init() {
  subscribeActionMain(store);
  createMenu();
  createTray();
  openAllWidgetStatusOpen();
}

export default init;
