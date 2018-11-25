import { createSelector } from 'reselect';
import shareSelector from '../../selectors';

export const configSelector = createSelector(
  shareSelector,
  share => share.get('config'),
);

export const hotKeySearchWindowSelector = createSelector(
  configSelector,
  config => config.get('hotKeySearchWindow'),
);

export const defaultUserAgentSelector = createSelector(
  configSelector,
  config => config.get('defaultUserAgent'),
);

export const languageSelector = createSelector(
  configSelector,
  config => config.get('language'),
);

export const newVersionSelector = createSelector(
  configSelector,
  config => config.get('newVersion'),
);

export const releaseNotesSelector = createSelector(
  configSelector,
  config => config.get('releaseNotes'),
);

export const skipVersionSelector = createSelector(
  configSelector,
  config => config.get('skipVersion'),
);
