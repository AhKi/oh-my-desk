import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import createWidget from 'utils/createWidget';
import * as TYPES from 'actions/actionTypes';

const initialState = Immutable.Map();

const byIdReducer = handleActions({
  [TYPES.REGISTER_NEW_WIDGET]: (state, action) => {
    const { id, info } = action.payload;
    const widgetInfo = createWidget(id, info);

    return state.set(id, Immutable.fromJS(widgetInfo));
  },
}, initialState);

export default byIdReducer;
