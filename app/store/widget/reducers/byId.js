import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import * as actions from '../actions';

const initialState = Immutable.Map();

const byIdReducer = handleActions({
	[actions.widgetListInfoStore]: (state, action) =>
		Immutable.Map(action.payload).map(v => Immutable.Map(v)),
}, initialState);

export default byIdReducer;