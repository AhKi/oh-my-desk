import { createSelector } from 'reselect';
import shareSelector from '../selectors';

export const updateSelector = createSelector(
  shareSelector,
  share => share.get('update'),
);

export const currentProgressSelector = createSelector(
  updateSelector,
  update => update.get('currentProgress'),
);

export const isAutoUpdateSelector = createSelector(
  updateSelector,
  update => update.get('isAutoUpdate'),
);

export const isAutoCheckUpdateSelector = createSelector(
  updateSelector,
  update => update.get('isAutoCheckUpdate'),
);

export const isCheckFetchSelector = createSelector(
  updateSelector,
  update => update.get('isCheckFetch'),
);

export const isDownloadFetchSelector = createSelector(
  updateSelector,
  update => update.get('isDownloadFetch'),
);

export const isRestartAfterUpdateSelector = createSelector(
  updateSelector,
  update => update.get('isRestartAfterUpdate'),
);

export const isUpdateCheckOnManualSelector = createSelector(
  updateSelector,
  update => update.get('isUpdateCheckOnManual'),
);

export const newVersionSelector = createSelector(
  updateSelector,
  update => update.get('newVersion'),
);

export const progressWindowIdSelector = createSelector(
  updateSelector,
  update => update.get('progressWindowId'),
);

export const releaseNotesSelector = createSelector(
  updateSelector,
  update => update.get('releaseNotes'),
);

export const skipVersionSelector = createSelector(
  updateSelector,
  update => update.get('skipVersion'),
);

export const totalProgressSelector = createSelector(
  updateSelector,
  update => update.get('totalProgress'),
);
