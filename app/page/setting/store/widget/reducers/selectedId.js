import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = null;

const selectedIdReducer = handleActions({
  [actions.widgetListSelect]: (state, action) => action.payload,
  [actions.widgetListInfoStore]: (state, action) => {
    if (state && !action.payload[state]) {
      return initialState;
    }
    return state;
  },
}, initialState);

export default selectedIdReducer;
