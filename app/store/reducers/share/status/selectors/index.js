import { createSelector } from 'reselect';
import shareSelector from '../../selectors';

export const statusSelector = createSelector(
  shareSelector,
  share => share.get('status'),
);

export const isCheckUpdateWhenStartSelector = createSelector(
  statusSelector,
  status => status.get('isCheckUpdateWhenStart'),
);

export const isDownloadFetchSelector = createSelector(
  statusSelector,
  status => status.get('isDownloadFetch'),
);

export const isDownloadUpdateWhenStartSelector = createSelector(
  statusSelector,
  status => status.get('isDownloadUpdateWhenStart'),
);

export const isLaunchAppWhenLoginSelector = createSelector(
  statusSelector,
  status => status.get('isLaunchAppWhenLogin'),
);

export const isOpenWidgetWhenStartSelector = createSelector(
  statusSelector,
  status => status.get('isOpenWidgetWhenStart'),
);

export const isRestartAfterUpdateSelector = createSelector(
  statusSelector,
  status => status.get('isRestartAfterUpdate'),
);

export const isUpdateCheckFetchSelector = createSelector(
  statusSelector,
  status => status.get('isUpdateCheckFetch'),
);

export const isUpdateCheckOnManualSelector = createSelector(
  statusSelector,
  status => status.get('isUpdateCheckOnManual'),
);

export const isUrlCheckFetchSelector = createSelector(
  statusSelector,
  status => status.get('isUrlCheckFetch'),
);
