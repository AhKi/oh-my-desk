import { ipcRenderer } from 'electron';
import { isFSA } from 'flux-standard-action';
import * as CATEGORY from 'actions/constant/actionCategory';

// TODO Add link about action categorizing docs

/**
 * Use in Renderer Process.
 * Action is separated by category of action
 * This is used in middleware redux.
 */
const categorizeActionInRenderer = () => next => (action) => {
  if (!isFSA(action)) {
    // if action is not FSA, do not broadcast to renderer processes.
    return next(action);
  }

  const { meta } = action;
  const category = meta && meta.category;

  /**
   * if category is SELF, dispatch action without transmit another process
   */
  if (category === CATEGORY.SELF) {
    return next(action);
  }

  /**
   * if category is BROADCAST, transmit action to main process
   * because renderer process can't transmit another renderer process.
   * so, transmit action to main process and is transmitted action then dispatch!
   * same as category is TARGET.
   */
  if (
    category === CATEGORY.BROADCAST ||
    category === CATEGORY.TARGET) {
    if (meta.transmitted) {
      return next(action);
    }

    const transmitAction = {
      type: action.type,
      payload: action.payload,
      meta: {
        ...action.meta,
        transmitted: false,
      },
    };

    ipcRenderer.send('redux-action', transmitAction);

    return meta.self ? next(action) : null;
  }

  /**
   * If don't exist category or don't match category, it may be wrong action.
   * But, just dispatch like self category and plain redux aciton.
   */
  return next(action);
};

export default categorizeActionInRenderer;
