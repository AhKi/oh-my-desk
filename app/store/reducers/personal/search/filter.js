import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = 'ALL';

const filterReducer = handleActions({
  [TYPES.SEARCH_SET_FILTER]: (state, action) => action.payload.filter,
}, initialState);

export default filterReducer;
