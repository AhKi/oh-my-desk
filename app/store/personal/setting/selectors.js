import { createSelector } from 'reselect';
import { personalSelector } from '../selectors';

export const settingSelector = createSelector(
  personalSelector,
  personal => personal.get('setting'),
);

export const selectedIdSelector = createSelector(
  settingSelector,
  setting => setting.get('selectedId'),
);
