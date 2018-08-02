import { combineActions, handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = false;

const isCheckFetchReducer = handleActions({
  [TYPES.UPDATE_CHECK_REQUEST]: () => true,
  [combineActions(
    TYPES.UPDATE_CHECK_FAILURE,
    TYPES.UPDATE_CHECK_SUCCESS,
    TYPES.SET_INITIAL_STORE,
  )]: () => false,
}, initialState);

export default isCheckFetchReducer;
