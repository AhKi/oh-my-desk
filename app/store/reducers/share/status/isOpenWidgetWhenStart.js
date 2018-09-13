import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = true;

const isOpenWidgetWhenStartReducer = handleActions({
  [TYPES.TOGGLE_OPEN_WIDGET_WHEN_START]: state => !state,
}, initialState);

export default isOpenWidgetWhenStartReducer;
