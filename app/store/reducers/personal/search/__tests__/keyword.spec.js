import * as actions from 'actions/search';
import keyword from '../keyword';

describe('test search keyword reducer', () => {
  it('should return default value', () => {
    expect(keyword(undefined, {})).toBe('');
  });

  it('should handle searchChangeKeyword', () => {
    const mock = 'mock-value';

    expect(keyword(undefined, actions.searchChangeKeyword(mock)))
      .toBe('mock-value');
  });

  it('should handle searchSetFilter', () => {
    expect(keyword('mock-value', actions.searchSetFilter()))
      .toBe('');
  });
});
