import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = false;

const isCheckUpdateWhenStartReducer = handleActions({
  [TYPES.UPDATE_SET_AUTO_CHECK_UPDATE]: (state, action) => action.payload.isCheckUpdateWhenStart,
}, initialState);

export default isCheckUpdateWhenStartReducer;
