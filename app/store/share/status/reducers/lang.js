import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = 'English';

const langReducer = handleActions({
  [TYPES.SET_LANGUAGE_ENGLISH]: () => 'English',
  [TYPES.SET_LANGUAGE_KOREAN]: () => 'Korean',
}, initialState);

export default langReducer;
