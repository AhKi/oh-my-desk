import { combineActions, handleActions } from 'redux-actions';
import Immutable from 'immutable';
import createWidget from 'main/utils/widget/createWidget';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = Immutable.Map();

const widgetInfoByIdReducer = handleActions({
  [TYPES.WIDGET_MAKE_REQUEST]: (state, action) => {
    const { id, info } = action.payload;
    const emptyInfo = {
      ...info,
      isMakeProgress: true,
    };

    const widgetInfo = createWidget(id, emptyInfo);

    return state.set(id, Immutable.fromJS(widgetInfo));
  },
  [TYPES.WIDGET_EDIT_REQUEST]: (state, action) => {
    const { id } = action.payload;

    return state.setIn([id, 'isEditProgress'], true);
  },
  [TYPES.WIDGET_EDIT_CANCEL]: (state, action) => {
    const { id } = action.payload;

    return state.setIn([id, 'isEditProgress'], false);
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

    if (widget.get('isMakeProgress')) {
      return state.delete(id);
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
