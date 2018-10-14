import { createActions } from 'redux-actions';
import * as CATEGORY from 'actions/constant/actionCategory';
import * as TYPES from 'actions/constant/actionTypes';

/**
 * Change about setting data.
 */
export const {
  setInitialStore,
  setLanguageEnglish,
  setLanguageKorean,
  setWhenQuitApp,
  toggleOpenAppWhenLogin,
  toggleOpenWidgetWhenStart,
  toggleWidgetDefaultUserAgent,
} = createActions({
  [TYPES.SET_INITIAL_STORE]: [
    /**
     * Setting data that initialized in store.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.SET_LANGUAGE_ENGLISH]: [
    /**
     * Setting language to English.
     */
    () => {},
    () => ({
      category: CATEGORY.BROADCAST,
    }),
  ],
  [TYPES.SET_LANGUAGE_KOREAN]: [
    /**
     * Setting language to Korean.
     */
    () => {},
    () => ({
      category: CATEGORY.BROADCAST,
    }),
  ],
  [TYPES.SET_WHEN_QUIT_APP]: [
    /**
     * Setting when app is quited.
     */
    () => {},
    () => ({
      category: CATEGORY.BROADCAST,
    }),
  ],
  [TYPES.TOGGLE_OPEN_APP_WHEN_LOGIN]: [
    /**
     * Toggle setting about starting app when login.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.TOGGLE_OPEN_WIDGET_WHEN_START]: [
    /**
     * Toggle setting if open widget that previously opened when start app.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.TOGGLE_WIDGET_DEFAULT_USER_AGENT]: [
    /**
     * Toggle default widget userAgent if DESKTOP or MOBILE.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
});
