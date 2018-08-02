import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = null;

const newVersionReducer = handleActions({
  [TYPES.UPDATE_CHECK_SUCCESS]: (state, action) => action.payload.version,
}, initialState);

export default newVersionReducer;
