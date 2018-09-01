import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = null;

const mySelf = handleActions({
  [TYPES.ALLOCATE_ID_TARGET_WIDGET]: (state, action) => action.payload.id,
}, initialState);

export default mySelf;
