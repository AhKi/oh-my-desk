import { combineActions, handleActions } from 'redux-actions';
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
    const { id } = action.payload;
    const widget = state.get(id);

    return state.set(id, widget.set('isOpen', true));
  },
  [combineActions(
    TYPES.CLOSE_TARGET_WIDGET,
    TYPES.CLOSE_TARGET_WIDGET_FORCED,
  )]: (state, action) => {
    const { id } = action.payload;
    const widget = state.get(id);

    if (!widget) {
      return state;
    }

    return state.set(id, widget.set('isOpen', false));
  },
  [TYPES.DELETE_TARGET_WIDGET]: (state, action) => {
    const { id } = action.payload;

    return state.delete(id);
  },
  [TYPES.FOCUS_WIDGET]: (state, action) => {
    const { id, time } = action.payload;
    const widget = state.get(id);

    return state.set(id, widget.set('resentFocusTime', time));
  },
  [TYPES.UPDATE_TARGET_WIDGET_INFO]: (state, action) => {
    const { id, info } = action.payload;

    const widgetInfo = state.get(id);
    const newInfo = Immutable.fromJS(info);
    const updatedInfo = widgetInfo.merge(newInfo);

    return state.set(id, updatedInfo);
  },
  [TYPES.SET_ALL_WIDGET_ISOPEN_FALSE]: state => state.map(item => item.set('isOpen', false)),
}, initialState);

export default byIdReducer;
