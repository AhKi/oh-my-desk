import { webContents } from 'electron';
import { isFSA } from 'flux-standard-action';
import * as statusSelectors from 'store/status/selectors';

const MAIN = 'MAIN';
const TARGET = 'TARGET';

/**
 * Use in Main Process.
 * Broadcast action to renderer process when emit main process.
 * If action is FSA Action, broadcast. if not, don't broadcast to renderer process.
 * This is used in middleware redux.
 */
const broadcastAction = store => next => (action) => {
  if (!isFSA(action)) {
    // if action is not FSA, do not broadcast to renderer processes.
    return next(action);
  }

  // if action.meta.source === TARGET, It is dispatched only renderer process.
  if (action.meta && action.meta.source === TARGET) {
    const widgets = statusSelectors.winWidgetsSelector(store.getState());
    const widget = widgets.get(action.meta.id);

    widget.webContents.send('redux-action', action);
    return null;
  }

  // action.meta.source use identification if action from main or renderer
  // if action.meta.source === MAIN, This is an action from main process.
  const actionFromMain = {
    ...action,
    meta: {
      ...action.meta,
      source: MAIN,
    },
  };

  const allWebContents = webContents.getAllWebContents();

  allWebContents.forEach(
    contents => contents.send('redux-action', actionFromMain),
  );

  return next(action);
};

export default broadcastAction;
