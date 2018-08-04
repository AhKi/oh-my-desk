import { createAction, createActions } from 'redux-actions';
import moment from 'moment';
import * as TYPES from '../actionTypes';
import * as CATEGORY from '../category';

export const {
  allocateIdTargetWidget,
} = createActions({
  [TYPES.ALLOCATE_ID_TARGET_WIDGET]: [
    id => ({ id }),
    id => ({
      category: CATEGORY.TARGET,
      target: [id],
      self: false,
    }),
  ],
});

export const {
  closeTargetWidget,
  closeTargetWidgetForced,
  deleteTargetWidget,
  focusWidget,
  registerNewWidget,
  showTargetWidget,
  updateTargetWidgetInfo,
} = createActions({
  [TYPES.CLOSE_TARGET_WIDGET]: [
    (id, info) => ({ id, info }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.CLOSE_TARGET_WIDGET_FORCED]: [
    (id, info) => ({ id, info }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.DELETE_TARGET_WIDGET]: [
    id => ({ id }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.FOCUS_WIDGET]: [
    id => ({ id, time: moment().toISOString() }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.REGISTER_NEW_WIDGET]: [
    (id, info) => ({ id, info }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.SHOW_TARGET_WIDGET]: [
    (id, isFocus) => ({ id, isFocus }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_TARGET_WIDGET_INFO]: [
    (id, info) => ({ id, info }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
});

export const setAllWidgetIsOpenFalse = createAction(
  TYPES.SET_ALL_WIDGET_ISOPEN_FALSE,
  () => {},
  () => ({ category: CATEGORY.SELF }),
);
