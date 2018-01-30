import { combineReducers } from 'redux-immutable';
import counter from './counter/reducers';
import modal from './modal/reducers';
import widget from './widget/reducers';

const rootReducer = combineReducers({
  counter,
  modal,
  widget,
});

export default rootReducer;
