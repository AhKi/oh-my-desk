import { webContents } from 'electron';
import { isFSA } from 'flux-standard-action';
import * as CATEGORY from 'actions/constant/actionCategory';
import { browserWindowByIdSelector } from 'store/reducers/personal/identification/selectors';
import controller from 'main/controllers';

// TODO Add link about action categorizing docs
/**
 * Use in Main Process.
 * Action is separated by category of action
 * This is used in middleware redux.
 */
const categorizeActionInMain = store => next => (action) => {
  if (!isFSA(action)) {
    // if action is not FSA, do not broadcast to renderer processes.
    // return controllerWrapper(next(action));
    controller(action, store.getState());
    return next(action);
  }

  const { meta } = action;
  const category = meta && meta.category;

  /**
   * if category is SELF, dispatch action without transmit another process
   */
  if (category === CATEGORY.SELF) {
    controller(action, store.getState());
    return next(action);
  }

  /**
   * if category is BROADCAST, transmit action to all renderer process
   */
  if (category === CATEGORY.BROADCAST) {
    if (meta.transmitted) {
      controller(action, store.getState());
      return next(action);
    }

    const broadcastAction = {
      type: action.type,
      payload: action.payload,
      meta: {
        ...action.meta,
        transmitted: true,
      },
    };
    const allWebContents = webContents.getAllWebContents();

    allWebContents.forEach(
      contents => contents.send('redux-action', broadcastAction),
    );

    controller(action, store.getState());
    return next(action);
  }

  /**
   * if category is TARGET, transmit action to targeted renderer process
   * meta.self is true or meta.containMain is true, dispatch main process.
   */
  if (category === CATEGORY.TARGET) {
    if (meta.transmitted) {
      controller(action, store.getState());
      return next(action);
    }

    const { target } = meta;
    const winById = browserWindowByIdSelector(store.getState());
    const targetArr = [];
    const targetAction = {
      type: action.type,
      payload: action.payload,
      meta: {
        ...action.meta,
        transmitted: true,
      },
    };

    if (target) {
      target.forEach((id) => { // TODO exception that id is not validity
        targetArr.push(winById.get(id));
      });
    }

    targetArr.forEach((win) => {
      win.webContents.send('redux-action', targetAction);
    });

    if (meta.self || meta.containMain) {
      controller(action, store.getState());
      return next(action);
    }
    return null;
  }

  /**
   * If don't exist category or don't match category, it may be wrong action.
   * But, just dispatch like self category and plain redux aciton.
   */
  controller(action, store.getState());
  return next(action);
};

export default categorizeActionInMain;
