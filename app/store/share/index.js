import { combineReducers } from 'redux-immutable';
import status from './status/reducers';
import widgets from './widgets/reducers';

const shareReducer = combineReducers({
  status,
  widgets,
});

export default shareReducer;
