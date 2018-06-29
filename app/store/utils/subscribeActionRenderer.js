import { ipcRenderer } from 'electron';

export default function subscribeActionRenderer(store) {
  ipcRenderer.on('redux-action', (e, payload) => {
    store.dispatch(payload);
  });
}
