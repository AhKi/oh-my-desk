import moment from 'moment';
import { createActions } from 'redux-actions';
import { v4 } from 'uuid';
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
  widgetMakeRequest,
  widgetOpen,
  widgetUpdateInfo,
  widgetUrlCheckRequest,
  widgetUrlCheckSuccess,
  widgetUrlValidCheck,
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
  [TYPES.WIDGET_MAKE_REQUEST]: [
    /**
     * Make process window of widget to make new window.
     * Need to dispatch only main process.
     */
    info => ({ id: v4(), info }),
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
  [TYPES.WIDGET_URL_CHECK_REQUEST]: [
    /**
     * Fetch get api to target url
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.WIDGET_URL_CHECK_SUCCESS]: [
    /**
     * Receive about fetch get api to target url
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.WIDGET_URL_VALID_CHECK]: [
    /**
     * Check if url is valid.
     * @param:String id: identification of target widget window.
     * @param:String name: widget name that will be set.
     * @param:String url: widget url that will be set.
     * @returns {{id : *, name : *, url : *}}
     */
    (id, name, url) => ({ id, name, url }),
    () => ({
      category: CATEGORY.TARGET,
      self: false,
      containMain: true,
    }),
  ],
});
