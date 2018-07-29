import { createSelector } from 'reselect';
import shareSelector from '../selectors';

export const statusSelector = createSelector(
  shareSelector,
  share => share.get('status'),
);

export const autoLaunchSelector = createSelector(
  statusSelector,
  status => status.get('autoLaunch'),
);

export const autoActiveWidgetSelector = createSelector(
  statusSelector,
  status => status.get('autoActiveWidget'),
);

export const preferenceIdSelector = createSelector(
  statusSelector,
  status => status.get('preferenceId'),
);

export const langSelector = createSelector(
  statusSelector,
  status => status.get('lang'),
);

export const widgetModeSelector = createSelector(
  statusSelector,
  status => status.get('widgetMode'),
);

export const isTrayOpenSelector = createSelector(
  statusSelector,
  status => status.get('isTrayOpen'),
);
