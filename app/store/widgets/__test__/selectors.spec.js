import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test widgets selector', () => {
  it('should select byId', () => {
    const state = Immutable.fromJS({
      widgets: {
        byId: {
          mock1: {},
          mock2: {},
        },
      },
    });

    expect(selectors.byIdSelector(state))
      .toEqual(Immutable.fromJS({
        mock1: {},
        mock2: {},
      }));
  });

  it('should select getWidgetArray', () => {
    const state = Immutable.fromJS({
      widgets: {
        byId: {
          mock1: {
            a: 'aa',
          },
          mock2: {
            2: '22',
          },
        },
      },
    });

    expect(selectors.getWidgetArray(state))
      .toEqual(Immutable.fromJS([{ a: 'aa' }, { 2: '22' }]));
  });

  it('should select getWidgetArray', () => {
    const state = Immutable.fromJS({
      widgets: {
        byId: {
          mock1: {
            a: 'aa',
          },
          mock2: {
            2: '22',
          },
        },
      },
      setting: {
        selectedId: 'mock1',
      },
    });

    expect(selectors.getSelectedWidget(state))
      .toEqual(Immutable.Map({ a: 'aa' }));
  });
});
