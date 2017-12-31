import { createAction } from 'redux-actions';
import * as TYPES from '../actionTypes';

export const widgetListInfoStore = createAction(TYPES.WIDGET_LIST_INFO_STORE);
export const widgetListSelect = createAction(TYPES.WIDGET_LIST_SELECT);

