import * as actions from 'actions/update';
import * as CATEGORY from 'actions/category';
import * as TYPES from 'actions/actionTypes';

describe('test update action', () => {
  it('should handle updateSkipThisVersion', () => {
    const mockAction = {
      type: TYPES.UPDATE_SKIP_THIS_VERSION,
      payload: {
        version: 'mock-version',
      },
      meta: {
        category: CATEGORY.TARGET,
        containMain: true,
        self: false,
      },
    };

    expect(actions.updateSkipThisVersion('mock-version'))
      .toEqual(mockAction);
  });
});
