import { createActions } from 'redux-actions';
import * as CATEGORY from 'actions/category';
import * as TYPES from 'actions/actionTypes';

export const {
  openBrowserWindow,
  closeBrowserWindow,
} = createActions({
  [TYPES.OPEN_BROWSER_WINDOW]: [
    (id, browserWindow) => ({ id, browserWindow }),
    () => ({ category: CATEGORY.SELF }),
  ],
  [TYPES.CLOSE_BROWSER_WINDOW]: [
    id => ({ id }),
    () => ({ category: CATEGORY.SELF }),
  ],
});
