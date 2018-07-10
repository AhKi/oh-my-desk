import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test widgets selector', () => {
  it('should select byId', () => {
    const state = Immutable.fromJS({
      share: {
        widgets: {
          byId: {
            mock1: {},
            mock2: {},
          },
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
      share: {
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
      },
    });

    expect(selectors.getWidgetArray(state))
      .toEqual(Immutable.fromJS([{ a: 'aa' }, { 2: '22' }]));
  });

  it('should select getSelectedWidget', () => {
    const state = Immutable.fromJS({
      share: {
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
      },
      personal: {
        setting: {
          selectedId: 'mock1',
        },
      },
    });

    expect(selectors.getSelectedWidget(state))
      .toEqual(Immutable.Map({ a: 'aa' }));
  });

  it('should select getByIdsIsOpenIsTrue', () => {
    const state = Immutable.fromJS({
      share: {
        widgets: {
          byId: {
            mock1: {
              a: 'aa',
              isOpen: true,
            },
            mock2: {
              a: 'aa',
              isOpen: false,
            },
            mock3: {
              b: 'cc',
              isOpen: true,
            },
            mock4: {
              2: '22',
            },
          },
        },
      },
    });

    expect(selectors.getByIdsIsOpenIsTrue(state))
      .toEqual(Immutable.fromJS({
        mock1: {
          a: 'aa',
          isOpen: true,
        },
        mock3: {
          b: 'cc',
          isOpen: true,
        },
      }));
  });

  it('should select getIndividualInfo', () => {
    const state = Immutable.fromJS({
      personal: {
        mySelfId: 'mock1',
      },
      share: {
        widgets: {
          byId: {
            mock1: {
              a: 'aa',
              isOpen: true,
            },
          },
        },
      },
    });

    expect(selectors.getIndividualInfo(state))
      .toEqual(Immutable.Map({
        a: 'aa',
        isOpen: true,
      }));
  });
});
