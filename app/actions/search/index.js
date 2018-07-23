import { createAction } from 'redux-actions';
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
