import * as actions from 'actions/search';
import selectedIndex from '../../reducers/selectedIndex';

describe('test search selectedIndex reducer', () => {
  it('should return default value', () => {
    expect(selectedIndex(undefined, {})).toBe(0);
  });

  it('should handle searchWidgetSelectIncrease', () => {
    expect(selectedIndex(3, actions.searchWidgetSelectIncrease()))
      .toBe(4);
  });

  it('should handle searchWidgetSelectDecrease', () => {
    expect(selectedIndex(3, actions.searchWidgetSelectDecrease()))
      .toBe(2);
  });

  it('should handle searchSetFilter', () => {
    expect(selectedIndex(3, actions.searchSetFilter()))
      .toBe(0);
  });

  it('should handle searchChangeKeyword', () => {
    expect(selectedIndex(3, actions.searchChangeKeyword()))
      .toBe(0);
  });
});
