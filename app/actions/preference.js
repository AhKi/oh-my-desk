import { createActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';
import * as CATEGORY from 'actions/constant/actionCategory';

/**
 * Action Set about Preference window.
 */
export const {
  preferenceOpen,
  preferenceClose,
  preferenceAllocateId,
} = createActions({
  [TYPES.PREFERENCE_OPEN]: [
    () => {},
    () => ({
      category: CATEGORY.TARGET,
      containMain: true,
    }),
  ],
  [TYPES.PREFERENCE_CLOSE]: [
    id => ({ id }),
    () => ({ category: CATEGORY.SELF }),
  ],
  [TYPES.PREFERENCE_ALLOCATE_ID]: [
    id => ({ id }),
    () => ({ category: CATEGORY.BROADCAST }),
  ],
});
