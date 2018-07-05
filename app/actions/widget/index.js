import { createActions } from 'redux-actions';
import * as TYPES from '../actionTypes';

export const {
  closeTargetWidget,
  deleteTargetWidget,
  registerNewWidget,
  registerNewWidgetBrowserWindow,
  registerNewWidgetBrowserWindows,
  showTargetWidget,
  updateTargetWidgetInfo,
} = createActions({
  [TYPES.CLOSE_TARGET_WIDGET]: (id, info) => ({ id, info }),
  [TYPES.DELETE_TARGET_WIDGET]: id => ({ id }),
  [TYPES.REGISTER_NEW_WIDGET]: (id, info) => ({ id, info }),
  [TYPES.REGISTER_NEW_WIDGET_BROWSER_WINDOW]: (id, browserWindow) => ({ id, browserWindow }),
  [TYPES.REGISTER_NEW_WIDGET_BROWSER_WINDOWS]: (ids, browserWindows) => ({ ids, browserWindows }),
  [TYPES.SHOW_TARGET_WIDGET]: id => ({ id }),
  [TYPES.UPDATE_TARGET_WIDGET_INFO]: (id, info) => ({ id, info }),
});
