import moment from 'moment';
import { createActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';
import * as CATEGORY from 'actions/constant/actionCategory';

/**
 * Action set used in widget window.
 */
export const {
  widgetAllocateIdTarget,
  widgetClose,
  widgetClosed,
  widgetCloseWhole,
  widgetDelete,
  widgetFocus,
  widgetMake,
  widgetOpen,
  widgetUpdateInfo,
} = createActions({
  [TYPES.WIDGET_ALLOCATE_ID_TARGET]: [
    /**
     * Allocate unique id to target widget.
     * @param:String id: identification of target widget window.
     * @returns {{id : *}}
     */
    id => ({ id }),
    id => ({
      category: CATEGORY.TARGET,
      target: [id],
      self: false,
    }),
  ],
  [TYPES.WIDGET_CLOSE]: [
    /**
     * Close target widget
     * @param:String id: identification of target widget window.
     * @returns {{id : *}}
     */
    id => ({ id }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.WIDGET_CLOSED]: [
    /**
     * When dispatched When already closed target widget
     * @param:String id: identification of target widget window.
     * @returns {{id : *}}
     */
    id => ({ id }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.WIDGET_CLOSE_WHOLE]: [
    /**
     * Close whole of widget.
     */
    () => {},
    () => ({ category: CATEGORY.SELF }),
  ],
  [TYPES.WIDGET_DELETE]: [
    /**
     * Delete target widget in list.
     * @param:String id: identification of target widget window.
     * @returns {{id : *}}
     */
    id => ({ id }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.WIDGET_FOCUS]: [
    /**
     * When focus widget matched id of param.
     * @param:String id: identification of target widget window.
     * @returns {{id : *, time : string}}
     */
    id => ({ id, time: moment().toISOString() }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.WIDGET_MAKE]: [
    /**
     * Make new widget using information.
     * @param:String id: identification that will be made widget.
     * @param:Object info: information to make new widget.
     * @returns {{id : *, info : *}}
     */
    (id, info) => ({ id, info }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.WIDGET_OPEN]: [
    /**
     * Open or Show widget matched id of param.
     * @param:String id: identification of target widget window.
     * @param:Boolean isFocus: if focus widget after open it.
     * @returns {{id : *, isFocus : *}}
     */
    (id, isFocus) => ({ id, isFocus }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.WIDGET_UPDATE_INFO]: [
    /**
     * Update target widget information
     * @param:String id: identification of target widget window.
     * @param:Object info: object of updated information.
     * @returns {{id : *, info : *}}
     */
    (id, info) => ({ id, info }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
});
