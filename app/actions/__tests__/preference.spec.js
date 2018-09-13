import * as CATEGORY from 'actions/constant/actionCategory';
import * as TYPES from 'actions/constant/actionTypes';
import * as actions from 'actions/preference';

describe('test preference action', () => {
  const mockId = 'mock-id';
  const mockMeta = {
    category: CATEGORY.SELF,
  };

  it('should handle preferenceAllocateId', () => {
    const mockAction = {
      type: TYPES.PREFERENCE_ALLOCATE_ID,
      payload: {
        id: mockId,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.preferenceAllocateId(mockId))
      .toEqual(mockAction);
  });

  it('should handle preferenceOpen', () => {
    const mockAction = {
      type: TYPES.PREFERENCE_OPEN,
      meta: {
        category: CATEGORY.TARGET,
        containMain: true,
      },
    };

    expect(actions.preferenceOpen(mockId))
      .toEqual(mockAction);
  });

  it('should handle preferenceClose', () => {
    const mockAction = {
      type: TYPES.PREFERENCE_CLOSE,
      payload: {
        id: 'mock-id',
      },
      meta: mockMeta,
    };

    expect(actions.preferenceClose('mock-id')).toEqual(mockAction);
  });
});
