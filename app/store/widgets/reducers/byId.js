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
    const { id } = action.payload;
    const widget = state.get(id);

    return state.set(id, widget.set('isOpen', true));
  },
  [TYPES.CLOSE_TARGET_WIDGET]: (state, action) => {
    const { id, info } = action.payload;
    let widget = state.get(id);

    if (info) {
      if (info.position) {
        widget = widget.set('position', Immutable.Map(info.position));
      }

      if (info.size) {
        widget = widget.set('size', Immutable.Map(info.size));
      }
    } else {
      return state;
    }

    return state.set(id, widget.set('isOpen', false));
  },
}, initialState);

export default byIdReducer;
