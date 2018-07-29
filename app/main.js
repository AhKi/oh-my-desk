import { app } from 'electron';
import store from 'store/storeMain';
import storeDataInDisk from 'utils/storeDataInDisk';
import init from 'utils/process/init';
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
  storeDataInDisk();
});
