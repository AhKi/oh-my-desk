import { createActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';
import * as CATEGORY from 'actions/constant/actionCategory';

export const {
  searchAppQuit,
  searchChangeKeyword,
  searchSetFilter,
  searchWidgetSelectIncrease,
  searchWidgetSelectDecrease,
} = createActions({
  [TYPES.SEARCH_APP_QUIT]: [
    /**
     * Alert message if quit 'oh-my-desk' in search window.
     */
    () => {},
    () => ({ category: CATEGORY.BROADCAST }),
  ],
  [TYPES.SEARCH_CHANGE_KEYWORD]: [
    /**
     * Change keyword for search
     * @param:String value: keyword about searching.
     * @returns {{value : *}}
     */
    value => ({ value }),
    () => ({ category: CATEGORY.SELF }),
  ],
  [TYPES.SEARCH_SET_FILTER]: [
    /**
     * Change filter for search
     * @param:String filter: filter about searching,
     * @returns {{filter : *}}
     */
    filter => ({ filter }),
    () => ({ category: CATEGORY.SELF }),
  ],
  [TYPES.SEARCH_WIDGET_SELECT_INCREASE]: [
    /**
     * Increase select index in list about searching window.
     */
    () => ({}),
    () => ({ category: CATEGORY.SELF }),
  ],
  [TYPES.SEARCH_WIDGET_SELECT_DECREASE]: [
    /**
     * Decrease select index in list about searching window.
     */
    () => ({}),
    () => ({ category: CATEGORY.SELF }),
  ],
});
