import Immutable from 'immutable';
import { combineActions, handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = Immutable.Map();

const browserWindowByIdReducer = handleActions({
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
  [TYPES.UPDATE_PROGRESS_WINDOW_OPEN]: (state, action) => {
    const { id, win } = action.payload;

    return state.set(id, win);
  },
  [combineActions(
    TYPES.CLOSE_BROWSER_WINDOW,
    TYPES.CLOSE_TARGET_WIDGET,
    TYPES.CLOSE_TARGET_WIDGET_FORCED,
    TYPES.CLOSE_PREFERENCE,
    TYPES.UPDATE_PROGRESS_WINDOW_CLOSE,
  )]: (state, action) => {
    const { id } = action.payload;

    return id ? state.delete(id) : state;
  },
}, initialState);

export default browserWindowByIdReducer;
