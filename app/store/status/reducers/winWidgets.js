import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import * as TYPES from 'actions/actionTypes';

const initialState = Immutable.Map();

const winWidgets = handleActions({
  [TYPES.REGISTER_NEW_WIDGET_BROWSER_WINDOW]: (state, action) => {
    const { id, browserWindow } = action.payload;

    return state.set(id, browserWindow);
  },
  [TYPES.CLOSE_TARGET_WIDGET]: (state, action) => {
    const { id } = action.payload;

    return state.delete(id);
  },
}, initialState);

export default winWidgets;
