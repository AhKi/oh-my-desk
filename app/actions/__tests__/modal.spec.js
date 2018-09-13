import * as TYPES from 'actions/constant/actionTypes';
import * as CATEGORY from 'actions/constant/actionCategory';
import * as actions from '../modal';

describe('test modal actions', () => {
  it('should match modalOpen action', () => {
    const mockAction = {
      type: TYPES.MODAL_OPEN,
      payload: {
        content: 'mock-content',
        props: 'mock-props',
      },
      meta: {
        category: CATEGORY.SELF,
      },
    };

    expect(actions.modalOpen('mock-content', 'mock-props'))
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
