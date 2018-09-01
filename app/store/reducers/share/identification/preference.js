import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = null;

const preferenceReducer = handleActions({
  [TYPES.ALLOCATE_PREFERENCE_ID]: (state, action) => action.payload.id,
  [TYPES.CLOSE_PREFERENCE]: () => initialState,
}, initialState);

export default preferenceReducer;
