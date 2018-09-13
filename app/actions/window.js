import { createActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';
import * as CATEGORY from 'actions/constant/actionCategory';

/**
 * To use that open window.
 */
export const { // eslint-disable-line import/prefer-default-export
  openBrowserWindow,
} = createActions({
  [TYPES.OPEN_BROWSER_WINDOW]: [
    /**
     * When open new window, Dispatch this action.
     * @param:String id: identification of window
     * @param:BrowserWindow? browserWindow: Electron BrowserWindow of target
     * @returns {{id: *, browserWindow: *}}
     */
    (id, browserWindow) => ({ id, browserWindow }),
    () => ({ category: CATEGORY.SELF }),
  ],
});
