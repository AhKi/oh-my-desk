import { combineReducers } from 'redux-immutable';
import modal from './modal/reducers';
import widget from './widget/reducers';

const rootReducer = combineReducers({
  modal,
  widget,
});

export default rootReducer;
