import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import * as TYPES from 'actions/actionTypes';

const initialState = Immutable.Map();

const winWidgets = handleActions({
  [TYPES.REGISTER_NEW_WIDGET_BROWSER_WINDOW]: (state, action) => {
    const { id, browserWindow } = action.payload;

    return state.set(id, browserWindow);
  },
  [TYPES.REGISTER_NEW_WIDGET_BROWSER_WINDOWS]: (state, action) => {
    const { ids, browserWindows } = action.payload;
    let nextState = state;

    ids.forEach((id, index) => {
      nextState = nextState.set(id, browserWindows[index]);
    });

    return nextState;
  },
  [TYPES.CLOSE_TARGET_WIDGET]: (state, action) => {
    const { id } = action.payload;

    return state.delete(id);
  },
}, initialState);

export default winWidgets;
