import Immutable from 'immutable';
import moment from 'moment';
import items from 'setting/store/widget/reducers/items';
import * as actions from 'setting/store/widget/actions';

describe('test widget items reducer', () => {
  it('should return initialState', () => {
    expect(items(undefined, {})).toBe(Immutable.List());
  });

  it('should handle widgetListInfoStore', () => {
    const payload = {
      mock1: {
        id: 'mock1',
        createTime: moment('2017-01-01'),
      },
      mock2: {
        id: 'mock2',
        createTime: moment('2017-01-02'),
      },
    };

    expect(items(undefined, actions.widgetListInfoStore(payload)))
      .toEqual(Immutable.List(['mock2', 'mock1']));
  });
});
