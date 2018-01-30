import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import * as actions from '../actions';

const initialState = Immutable.List();

const itemsReducer = handleActions({
  [actions.widgetListInfoStore]: (state, action) =>
    Immutable.List(Object.keys(action.payload)),
}, initialState);

export default itemsReducer;
