import { createSelector } from 'reselect';

export const statusSelector = state => state.get('status');

export const winPreferenceSelector = createSelector(
  statusSelector,
  status => status.get('winPreference'),
);

export const winWidgetsSelector = createSelector(
  statusSelector,
  status => status.get('winWidgets'),
);
