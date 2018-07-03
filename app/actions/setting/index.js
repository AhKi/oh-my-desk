import { createAction } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

export const settingSelectWidget = // eslint-disable-line
  createAction(TYPES.SETTING_SELECT_WIDGET, id => ({ id }));
