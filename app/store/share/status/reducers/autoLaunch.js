import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = true;

const autoLaunchReducer = handleActions({
  [TYPES.TOGGLE_AUTO_LAUNCH]: state => !state,
}, initialState);

export default autoLaunchReducer;
