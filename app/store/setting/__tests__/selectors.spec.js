import Immutable from 'immutable';
import * as FILTER from 'constants/filter';
import * as selectors from '../selectors';

describe('test setting selectors', () => {
  it('should select currentPage', () => {
    const state = Immutable.fromJS({
      setting: {
        currentPage: 5,
      },
    });

    expect(selectors.currentPageSelector(state)).toBe(5);
  });

  it('should select filter', () => {
    const state = Immutable.fromJS({
      setting: {
        filter: FILTER.ACTIVATED,
      },
    });

    expect(selectors.filterSelector(state)).toBe(FILTER.ACTIVATED);
  });

  it('should select selectedId', () => {
    const mockId = 'mock-id';
    const state = Immutable.fromJS({
      setting: {
        selectedId: 'mock-id',
      },
    });

    expect(selectors.selectedIdSelector(state)).toBe(mockId);
  });
});
