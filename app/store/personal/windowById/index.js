import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = Immutable.Map();

const windowByIdReducer = handleActions({
  [TYPES.OPEN_BROWSER_WINDOW]: (state, action) => {
    const { id, browserWindow } = action.payload;

    return state.set(id, browserWindow);
  },
  [TYPES.CLOSE_BROWSER_WINDOW]: (state, action) => {
    const { id } = action.payload;

    return state.delete(id);
  },
}, initialState);

export default windowByIdReducer;
