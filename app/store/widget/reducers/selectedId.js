import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = null;

const selectedIdReducer = handleActions({
	[actions.widgetListSelect]: (state, action) => action.payload,
}, initialState);

export default selectedIdReducer;