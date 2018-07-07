// import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = null;

const winPreference = handleActions({
  [TYPES.OPEN_PREFERENCE]:
    (state, action) => JSON.stringify(action.payload.win),
  [TYPES.CLOSE_PREFERENCE]: () => initialState,
}, initialState);

export default winPreference;
