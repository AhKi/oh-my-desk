import { createSelector } from 'reselect';

export const personalSelector = state => state.get('personal');

export const windowByIdSelector = createSelector(
  personalSelector,
  personal => personal.get('windowById'),
);
