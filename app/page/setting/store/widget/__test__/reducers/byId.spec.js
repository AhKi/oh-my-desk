import Immutable from 'immutable';
import byId from 'setting/store/widget/reducers/byId';
import * as actions from 'setting/store/widget/actions';

describe('test widget byid reducer', () => {
  it('should return initialState', () => {
    expect(byId(undefined, {})).toBe(Immutable.Map());
  });

  it('should handle widgetListInfoStore', () => {
    const payload = {
      mock1: {},
      mock2: {},
    };

    expect(byId(undefined, actions.widgetListInfoStore(payload)))
      .toEqual(Immutable.fromJS(payload));
  });

  it('should handle widgetInfoUpdate', () => {
    const state = Immutable.fromJS({
      mock1: {
        name: 'name',
        title: 'title',
      },
      mock2: {
        name: 'name',
        title: 'title',
      },
    });
    const id = 'mock2';
    const update = {
      name: 'mock-name',
      title: 'mock-title',
    };

    expect(byId(state, actions.widgetInfoUpdate(id, update))).toEqual(
      Immutable.fromJS({
        mock1: {
          name: 'name',
          title: 'title',
        },
        mock2: {
          name: 'mock-name',
          title: 'mock-title',
        },
      }),
    );
  });
});
