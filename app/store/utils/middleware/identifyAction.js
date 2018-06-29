import { ipcRenderer } from 'electron';
import { isFSA } from 'flux-standard-action';

const MAIN = 'MAIN';

/**
 * Use in Renderer Process.
 * If action is from main, dispatch it.
 * If not, cancel action and pass action to main.
 * This is used in middleware redux.
 */
const identifyAction = () => next => (action) => {
  if (!isFSA(action)) {
    // if action is not FSA, do not broadcast to renderer processes.
    return next(action);
  }

  if (action.meta && action.meta.source === MAIN) {
    return next(action);
  }

  ipcRenderer.send('redux-action', action);
  return null;
};

export default identifyAction;
