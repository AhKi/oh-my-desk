import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const NUMBER_PER_PAGE = 6;
const initialState = 1;

const maxPageReducer = handleActions({
  [actions.widgetListInfoStore]: (state, action) =>
    Math.ceil(Object.keys(action.payload).length / NUMBER_PER_PAGE),
}, initialState);

export default maxPageReducer;
