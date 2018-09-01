import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = true;

const isOpenWidgetWhenStartReducer = handleActions({
  [TYPES.TOGGLE_AUTO_ACTIVE_WIDGET]: state => !state,
}, initialState);

export default isOpenWidgetWhenStartReducer;
