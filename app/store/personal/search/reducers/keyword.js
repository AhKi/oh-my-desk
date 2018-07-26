import { combineActions, handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = '';

const keywordReducer = handleActions({
  [TYPES.SEARCH_CHANGE_KEYWORD]: (state, action) => action.payload.value,
  [combineActions(
    TYPES.SEARCH_SET_FILTER,
    TYPES.TRAY_WINDOW_CLOSE,
  )]: () => initialState,
}, initialState);

export default keywordReducer;
