import { ipcMain } from 'electron';
import controller from 'process/main/controllers';

export default function subscribeActionMain(store) {
  global.getReduxState = () => JSON.stringify(store.getState());

  ipcMain.on('redux-action', (e, payload) => {
    const prevState = store.getState();
    store.dispatch(payload);
    const nextState = store.getState();

    controller(prevState, nextState);
  });
}
