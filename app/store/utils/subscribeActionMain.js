import { ipcMain } from 'electron';

export default function subscribeActionMain(store) {
  global.getReduxState = () => JSON.stringify(store.getState().get('share'));

  ipcMain.on('redux-action', (e, action) => {
    store.dispatch(action);
  });
}
