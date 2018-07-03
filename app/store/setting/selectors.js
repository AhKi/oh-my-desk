import { createSelector } from 'reselect';

export const settingSelector = state => state.get('setting');

export const currentPageSelector = createSelector(
  settingSelector,
  setting => setting.get('currentPage'),
);

export const filterSelector = createSelector(
  settingSelector,
  setting => setting.get('filter'),
);

export const selectedIdSelector = createSelector(
  settingSelector,
  setting => setting.get('selectedId'),
);
