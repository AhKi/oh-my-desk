import { combineActions, handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = 0;

const selectedIndexReducer = handleActions({
  [TYPES.SEARCH_WIDGET_SELECT_INCREASE]: state => state + 1,
  [TYPES.SEARCH_WIDGET_SELECT_DECREASE]: state => state - 1,
  [combineActions(
    TYPES.SEARCH_SET_FILTER,
    TYPES.SEARCH_CHANGE_KEYWORD,
  )]: () => initialState,
}, initialState);

export default selectedIndexReducer;
