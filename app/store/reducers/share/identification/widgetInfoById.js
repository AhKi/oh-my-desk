import { combineActions, handleActions } from 'redux-actions';
import Immutable from 'immutable';
import createWidget from 'main/utils/widget/createWidget';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = Immutable.Map();

const widgetInfoByIdReducer = handleActions({
  [TYPES.WIDGET_MAKE]: (state, action) => {
    const { id, info } = action.payload;
    const widgetInfo = createWidget(id, info);

    return state.set(id, Immutable.fromJS(widgetInfo));
  },
  [TYPES.WIDGET_OPEN]: (state, action) => {
    const { id } = action.payload;
    const widget = state.get(id);

    return state.set(id, widget.set('isOpen', true));
  },
  [combineActions(
    TYPES.WIDGET_CLOSE,
    TYPES.WIDGET_CLOSED,
  )]: (state, action) => {
    const { id } = action.payload;
    const widget = state.get(id);

    if (!widget) {
      return state;
    }

    return state.set(id, widget.set('isOpen', false));
  },
  [TYPES.WIDGET_DELETE]: (state, action) => {
    const { id } = action.payload;

    return state.delete(id);
  },
  [TYPES.WIDGET_FOCUS]: (state, action) => {
    const { id, time } = action.payload;
    const widget = state.get(id);

    return state.set(id, widget.set('resentFocusTime', time));
  },
  [TYPES.WIDGET_UPDATE_INFO]: (state, action) => {
    const { id, info } = action.payload;

    const widgetInfo = state.get(id);
    const newInfo = Immutable.fromJS(info);
    const updatedInfo = widgetInfo.merge(newInfo);

    return state.set(id, updatedInfo);
  },
  [TYPES.WIDGET_CLOSE_WHOLE]: state => state.map(item => item.set('isOpen', false)),
}, initialState);

export default widgetInfoByIdReducer;
