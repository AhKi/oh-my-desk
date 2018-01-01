import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import * as actions from '../actions';

const initialState = Immutable.Map();

const modalPropsReducer = handleActions({
	[actions.modalOpen]: (state, action) =>
		Immutable.Map(action.payload.modalProps),
	[actions.modalClose]: () => initialState,
}, initialState);

export default modalPropsReducer;