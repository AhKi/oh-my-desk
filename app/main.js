import { app } from 'electron';
import store from 'store/storeMain';
import saveData from 'main/utils/disk/saveData';
import init from 'main/utils/init';
import { closePreference } from 'actions/status';
import { setAllWidgetIsOpenFalse } from 'actions/widget';
import { isOpenWidgetWhenStartSelector } from 'store/reducers/share/status/selectors';

app.on('ready', init);

app.on('before-quit', () => {
  const isOpenWidgetWhenStart = isOpenWidgetWhenStartSelector(store.getState());

  if (!isOpenWidgetWhenStart) {
    store.dispatch(setAllWidgetIsOpenFalse());
  }
  store.dispatch(closePreference());
  saveData();
});
