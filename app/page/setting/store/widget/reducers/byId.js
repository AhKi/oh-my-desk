import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import * as actions from '../actions';

const initialState = Immutable.Map();

const byIdReducer = handleActions({
  [actions.widgetListInfoStore]:
    (state, action) => Immutable.Map(action.payload).map(v => Immutable.Map(v)),
  [actions.widgetInfoUpdate]: (state, action) => {
    const { id, update } = action.payload;

    return state.update(id, (v) => {
      const obj = v.toObject();

      return Immutable.Map(Object.assign({}, obj, update));
    });
  },
}, initialState);

export default byIdReducer;
