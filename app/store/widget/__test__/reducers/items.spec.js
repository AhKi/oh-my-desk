import Immutable from 'immutable';
import items from 'store/widget/reducers/items';
import * as actions from 'store/widget/actions';

describe('test widget items reducer', () => {
  it('should return initialState', () => {
    expect(items(undefined, {})).toBe(Immutable.List());
  });

  it('should handle widgetListInfoStore', () => {
    const payload = {
      mock1: {},
      mock2: {},
    };

    expect(items(undefined, actions.widgetListInfoStore(payload)))
      .toEqual(Immutable.List(['mock1', 'mock2']));
  });
});
