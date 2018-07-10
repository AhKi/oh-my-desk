import * as TYPES from 'actions/actionTypes';
import * as CATEGORY from 'actions/category';
import * as actions from '.';

describe('test modal actions', () => {
  it('should match modalOpen action', () => {
    const mockAction = {
      type: TYPES.MODAL_OPEN,
      payload: {
        modalType: 'mock-type',
        modalProps: 'mock-props',
      },
      meta: {
        category: CATEGORY.SELF,
      },
    };

    expect(actions.modalOpen('mock-type', 'mock-props'))
      .toEqual(mockAction);
  });

  it('should match modalClose action', () => {
    const mockAction = {
      type: TYPES.MODAL_CLOSE,
      meta: {
        category: CATEGORY.SELF,
      },
    };

    expect(actions.modalClose())
      .toEqual(mockAction);
  });
});
