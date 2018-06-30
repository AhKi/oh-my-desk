import { combineReducers } from 'redux-immutable';
import status from './models/status/reducers';
import modal from './models/modal/reducers';
import widget from './models/widget/reducers';

const rootReducer = combineReducers({
  status,
  modal,
  widget,
});

export default rootReducer;
