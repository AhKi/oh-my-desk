import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = '';

const keywordReducer = handleActions({
  [TYPES.SEARCH_CHANGE_KEYWORD]: (state, action) => action.payload.value,
  [TYPES.SEARCH_SET_FILTER]: () => initialState,
}, initialState);

export default keywordReducer;
