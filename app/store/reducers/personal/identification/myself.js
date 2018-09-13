import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = null;

const mySelf = handleActions({
  [TYPES.WIDGET_ALLOCATE_ID_TARGET]: (state, action) => action.payload.id,
}, initialState);

export default mySelf;
