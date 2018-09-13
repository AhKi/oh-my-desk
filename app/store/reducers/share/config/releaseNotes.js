import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = null;

const releaseNotesReducer = handleActions({
  [TYPES.UPDATE_CHECK_SUCCESS]: (state, action) => action.payload.releaseNotes,
}, initialState);

export default releaseNotesReducer;
