import { app } from 'electron';
import store from 'store/storeMain';
import storeDataInDisk from 'utils/storeDataInDisk';
import init from 'utils/process/init';
import * as statusActions from 'actions/status';

app.on('ready', init);

app.on('before-quit', () => {
  store.dispatch(statusActions.closePreference());
  storeDataInDisk();
});
