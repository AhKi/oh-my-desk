import * as TYPES from 'actions/actionTypes';
import * as CATEGORY from 'actions/category';
import * as actions from '.';

describe('test search actions', () => {
  it('should handle searchChangeKeyword', () => {
    const mockAction = {
      type: TYPES.SEARCH_CHANGE_KEYWORD,
      payload: {
        value: 'mock-value',
      },
      meta: {
        category: CATEGORY.SELF,
      },
    };

    expect(actions.searchChangeKeyword('mock-value')).toEqual(mockAction);
  });

  it('should handle searchSetFilter', () => {
    const mockAction = {
      type: TYPES.SEARCH_SET_FILTER,
      payload: {
        filter: 'mock-filter',
      },
      meta: {
        category: CATEGORY.SELF,
      },
    };

    expect(actions.searchSetFilter('mock-filter')).toEqual(mockAction);
  });
});
