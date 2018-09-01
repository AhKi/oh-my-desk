import * as actions from 'actions/search';
import filter from '../filter';

describe('test search filter reducer', () => {
  it('should return default value', () => {
    expect(filter(undefined, {})).toBe('ALL');
  });

  it('should handle searchSetFilter', () => {
    const mock = 'mock-filter';

    expect(filter(undefined, actions.searchSetFilter(mock)))
      .toBe('mock-filter');
  });
});
