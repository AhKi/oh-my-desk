import { app } from 'electron';
import store from 'store/storeMain';
import saveData from 'main/utils/disk/saveData';
import init from 'main/utils/init';
import { preferenceClose } from 'actions/preference';
import { widgetCloseWhole } from 'actions/widget';
import { setWhenQuitApp } from 'actions/setting';
import { isOpenWidgetWhenStartSelector } from 'store/reducers/share/status/selectors';

app.on('ready', init);

app.on('before-quit', () => {
  const isOpenWidgetWhenStart = isOpenWidgetWhenStartSelector(store.getState());

  if (!isOpenWidgetWhenStart) {
    store.dispatch(widgetCloseWhole());
  }
  store.dispatch(preferenceClose());
  store.dispatch(setWhenQuitApp());
  saveData();
});
