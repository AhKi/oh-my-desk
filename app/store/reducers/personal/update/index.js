import { combineReducers } from 'redux-immutable';
import currentProgress from './currentProgress';
import totalProgress from './totalProgress';

const updateReducer = combineReducers({
  currentProgress,
  totalProgress,
});

export default updateReducer;
