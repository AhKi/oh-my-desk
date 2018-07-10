import Immutable from 'immutable';
import { combineActions, handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = Immutable.Map();

const windowByIdReducer = handleActions({
  [TYPES.OPEN_BROWSER_WINDOW]: (state, action) => {
    const { id, browserWindow } = action.payload;

    if (Array.isArray(id)) {
      let nextState = state;
      id.forEach((item, index) => {
        nextState = nextState.set(item, browserWindow[index]);
      });
      return nextState;
    }

    return state.set(id, browserWindow);
  },
  [combineActions(
    TYPES.CLOSE_BROWSER_WINDOW,
    TYPES.CLOSE_TARGET_WIDGET,
    TYPES.CLOSE_PREFERENCE,
  )]: (state, action) => {
    const { id } = action.payload;

    return id ? state.delete(id) : state;
  },
}, initialState);

export default windowByIdReducer;
