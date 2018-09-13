import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = 'English';

const languageReducer = handleActions({
  [TYPES.SET_LANGUAGE_ENGLISH]: () => 'English',
  [TYPES.SET_LANGUAGE_KOREAN]: () => 'Korean',
}, initialState);

export default languageReducer;
