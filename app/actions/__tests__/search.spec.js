import * as TYPES from 'actions/constant/actionTypes';
import * as CATEGORY from 'actions/constant/actionCategory';
import * as actions from 'actions/search';

describe('test search actions', () => {
  it('should handle searchAppQuit', () => {
    const mockAction = {
      type: TYPES.SEARCH_APP_QUIT,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.searchAppQuit()).toEqual(mockAction);
  });

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

  it('should handle searchWidgetSelectDecrease', () => {
    const mockAction = {
      type: TYPES.SEARCH_WIDGET_SELECT_DECREASE,
      payload: {},
      meta: {
        category: CATEGORY.SELF,
      },
    };

    expect(actions.searchWidgetSelectDecrease()).toEqual(mockAction);
  });

  it('should handle searchWidgetSelectIncrease', () => {
    const mockAction = {
      type: TYPES.SEARCH_WIDGET_SELECT_INCREASE,
      payload: {},
      meta: {
        category: CATEGORY.SELF,
      },
    };

    expect(actions.searchWidgetSelectIncrease()).toEqual(mockAction);
  });
});
