import { app } from 'electron';
import store from 'store/storeMain';
import saveData from 'main/utils/disk/saveData';
import init from 'main/utils/init';
import { closePreference } from 'actions/status';
import { setAllWidgetIsOpenFalse } from 'actions/widget';
import { autoActiveWidgetSelector } from 'store/share/status/selectors';

app.on('ready', init);

app.on('before-quit', () => {
  const autoActiveWidget = autoActiveWidgetSelector(store.getState());

  if (!autoActiveWidget) {
    store.dispatch(setAllWidgetIsOpenFalse());
  }
  store.dispatch(closePreference());
  saveData();
});
