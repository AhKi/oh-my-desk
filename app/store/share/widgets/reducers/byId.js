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
  [TYPES.SHOW_TARGET_WIDGET]: (state, action) => {
    const { id, time } = action.payload;
    const widget = state.get(id);

    return state.set(id, widget.set('isOpen', true).set('resentOpenTime', time));
  },
  [TYPES.CLOSE_TARGET_WIDGET]: (state, action) => {
    const { id } = action.payload;
    const widget = state.get(id);

    return state.set(id, widget.set('isOpen', false));
  },
  [TYPES.DELETE_TARGET_WIDGET]: (state, action) => {
    const { id } = action.payload;

    return state.delete(id);
  },
  [TYPES.UPDATE_TARGET_WIDGET_INFO]: (state, action) => {
    const { id, info } = action.payload;

    const widgetInfo = state.get(id);
    const newInfo = Immutable.fromJS(info);
    const updatedInfo = widgetInfo.merge(newInfo);

    return state.set(id, updatedInfo);
  },
}, initialState);

export default byIdReducer;
