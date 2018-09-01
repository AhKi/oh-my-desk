import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test search selectors', () => {
  it('should select filter', () => {
    const mock = 'mock-filter';
    const state = Immutable.fromJS({
      personal: {
        search: {
          filter: mock,
        },
      },
    });

    expect(selectors.filterSelector(state)).toBe(mock);
  });

  it('should select filter', () => {
    const mock = 'mock-value';
    const state = Immutable.fromJS({
      personal: {
        search: {
          keyword: mock,
        },
      },
    });

    expect(selectors.keywordSelector(state)).toBe(mock);
  });
});
