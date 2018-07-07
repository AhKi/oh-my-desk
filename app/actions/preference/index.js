import { createActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

export const {
  openPreference,
  closePreference,
} = createActions({
  [TYPES.OPEN_PREFERENCE]: win => ({ win }),
},
TYPES.CLOSE_PREFERENCE);
