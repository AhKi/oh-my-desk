import { createAction, createActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';
import * as CATEGORY from 'actions/category';

export const searchChangeKeyword =
  createAction(
    TYPES.SEARCH_CHANGE_KEYWORD,
    value => ({ value }),
    () => ({ category: CATEGORY.SELF }),
  );

export const searchSetFilter =
  createAction(
    TYPES.SEARCH_SET_FILTER,
    filter => ({ filter }),
    () => ({ category: CATEGORY.SELF }),
  );

export const searchWindowHide =
  createAction(
    TYPES.SEARCH_WINDOW_HIDE,
    () => ({}),
    () => ({
      category: CATEGORY.TARGET,
      containMain: true,
      self: false,
    }),
  );

export const {
  searchWidgetSelectIncrease,
  searchWidgetSelectDecrease,
} = createActions({
  [TYPES.SEARCH_WIDGET_SELECT_INCREASE]: [
    () => ({}),
    () => ({ category: CATEGORY.SELF }),
  ],
  [TYPES.SEARCH_WIDGET_SELECT_DECREASE]: [
    () => ({}),
    () => ({ category: CATEGORY.SELF }),
  ],
});
