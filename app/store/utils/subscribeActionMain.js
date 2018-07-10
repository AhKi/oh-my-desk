import { ipcMain } from 'electron';
import controller from 'store/utils/controllers';

export default function subscribeActionMain(store) {
  global.getReduxState = () => JSON.stringify(store.getState().get('share'));

  ipcMain.on('redux-action', (e, action) => {
    const prevState = store.getState();
    store.dispatch(action);
    const nextState = store.getState();

    controller(action, prevState, nextState);
  });
}
