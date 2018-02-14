import { handleActions } from 'redux-actions';
import * as FILTER from 'constants/filter';
import * as actions from '../actions';

const initialState = FILTER.LATEST;

const filterReducer = handleActions({
  [actions.widgetSelectFilter]: (state, action) => action.payload,
}, initialState);

export default filterReducer;
