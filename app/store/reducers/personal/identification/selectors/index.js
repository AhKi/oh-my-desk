import { createSelector } from 'reselect';
import personalSelector from '../../selectors';

export const identificationSelector = createSelector(
  personalSelector,
  personal => personal.get('identification'),
);

export const myselfSelector = createSelector(
  identificationSelector,
  identification => identification.get('myself'),
);

export const browserWindowByIdSelector = createSelector(
  identificationSelector,
  identification => identification.get('browserWindowById'),
);
