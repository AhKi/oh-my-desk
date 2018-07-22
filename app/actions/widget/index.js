import { createActions } from 'redux-actions';
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
  deleteTargetWidget,
  registerNewWidget,
  showTargetWidget,
  updateTargetWidgetInfo,
} = createActions({
  [TYPES.CLOSE_TARGET_WIDGET]: [
    (id, info) => ({ id, info }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.DELETE_TARGET_WIDGET]: [
    id => ({ id }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.REGISTER_NEW_WIDGET]: [
    (id, info) => ({ id, info }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.SHOW_TARGET_WIDGET]: [
    id => ({ id, time: moment().toISOString() }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.UPDATE_TARGET_WIDGET_INFO]: [
    (id, info) => ({ id, info }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
});
