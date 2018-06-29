import { ipcMain } from 'electron';

export default function subscribeActionMain(store) {
  global.getReduxState = () => JSON.stringify(store.getState());

  ipcMain.on('redux-action', (e, payload) => {
    store.dispatch(payload);
  });
}
