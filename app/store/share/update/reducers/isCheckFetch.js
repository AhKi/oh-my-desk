import { combineActions, handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = false;

const isCheckFetchReducer = handleActions({
  [combineActions(
    TYPES.UPDATE_CHECK_REQUEST,
    TYPES.UPDATE_CHECK_REQUEST_ON_MANUAL,
  )]: () => true,
  [combineActions(
    TYPES.UPDATE_CHECK_FAILURE,
    TYPES.UPDATE_CHECK_SUCCESS,
    TYPES.SET_INITIAL_STORE,
  )]: () => false,
}, initialState);

export default isCheckFetchReducer;
