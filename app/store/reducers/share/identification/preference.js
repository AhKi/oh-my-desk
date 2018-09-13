import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = null;

const preferenceReducer = handleActions({
  [TYPES.PREFERENCE_ALLOCATE_ID]: (state, action) => action.payload.id,
  [TYPES.PREFERENCE_CLOSE]: () => initialState,
}, initialState);

export default preferenceReducer;
