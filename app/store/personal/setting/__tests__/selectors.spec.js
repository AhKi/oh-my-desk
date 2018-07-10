import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test setting selectors', () => {
  it('should select selectedId', () => {
    const mockId = 'mock-id';
    const state = Immutable.fromJS({
      personal: {
        setting: {
          selectedId: 'mock-id',
        },
      },
    });

    expect(selectors.selectedIdSelector(state)).toBe(mockId);
  });
});
