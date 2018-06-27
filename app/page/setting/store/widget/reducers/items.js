import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import moment from 'moment';
import * as actions from '../actions';

const initialState = Immutable.List();

const itemsReducer = handleActions({
  [actions.widgetListInfoStore]: (state, action) => Immutable.List(Object.values(action.payload)
    .sort((lValue, rValue) => moment(lValue.createTime).isBefore(moment(rValue.createTime)))
    .map(v => v.id)),
}, initialState);

export default itemsReducer;
