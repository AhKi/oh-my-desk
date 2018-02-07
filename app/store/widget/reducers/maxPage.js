import { handleActions } from 'redux-actions';
import * as CONST from 'constants/index';
import * as actions from '../actions';

const initialState = 1;

const maxPageReducer = handleActions({
  [actions.widgetListInfoStore]: (state, action) =>
    Math.ceil(Object.keys(action.payload).length / CONST.NUMBER_PER_PAGE),
}, initialState);

export default maxPageReducer;
