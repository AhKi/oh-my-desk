import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = true;

const isLaunchAppWhenLoginReducer = handleActions({
  [TYPES.TOGGLE_OPEN_APP_WHEN_LOGIN]: state => !state,
}, initialState);

export default isLaunchAppWhenLoginReducer;
