import Immutable from 'immutable';
import moment from 'moment';
import * as selectors from '../selectors';

jest.unmock('moment');

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
              resentFocusTime: moment('2018-01-01').toISOString(),
            },
            mock2: {
              2: '22',
              resentFocusTime: moment('2017-01-02').toISOString(),
            },
            mock3: {
              3: '33',
              resentFocusTime: moment('2018-01-03').toISOString(),
            },
          },
        },
      },
    });

    expect(selectors.getWidgetArray(state))
      .toEqual(Immutable.fromJS([
        {
          3: '33',
          resentFocusTime: moment('2018-01-03').toISOString(),
        },
        {
          a: 'aa',
          resentFocusTime: moment('2018-01-01').toISOString(),
        },
        {
          2: '22',
          resentFocusTime: moment('2017-01-02').toISOString(),
        },
      ]));
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

  describe('should select getFilteredWidget', () => {
    it('when filter === ALL', () => {
      const state = Immutable.fromJS({
        personal: {
          search: {
            filter: 'ALL',
          },
        },
        share: {
          widgets: {
            byId: {
              mock1: {
                a: 'aa',
                favorites: true,
                resentFocusTime: moment('2018-01-04').toISOString(),
              },
              mock2: {
                b: 'bb',
                favorites: true,
                resentFocusTime: moment('2018-01-03').toISOString(),
              },
              mock3: {
                c: 'cc',
                favorites: false,
                resentFocusTime: moment('2018-01-02').toISOString(),
              },
              mock4: {
                d: 'dd',
                favorites: true,
                resentFocusTime: moment('2018-01-01').toISOString(),
              },
            },
          },
        },
      });

      expect(selectors.getFilteredWidget(state))
        .toEqual(Immutable.fromJS([
          {
            a: 'aa',
            favorites: true,
            resentFocusTime: moment('2018-01-04').toISOString(),
          },
          {
            b: 'bb',
            favorites: true,
            resentFocusTime: moment('2018-01-03').toISOString(),
          },
          {
            c: 'cc',
            favorites: false,
            resentFocusTime: moment('2018-01-02').toISOString(),
          },
          {
            d: 'dd',
            favorites: true,
            resentFocusTime: moment('2018-01-01').toISOString(),
          },
        ]));
    });

    it('when filter === FAVORITES', () => {
      const state = Immutable.fromJS({
        personal: {
          search: {
            filter: 'FAVORITES',
          },
        },
        share: {
          widgets: {
            byId: {
              mock1: {
                a: 'aa',
                favorites: true,
                resentFocusTime: moment('2018-01-04').toISOString(),
              },
              mock2: {
                b: 'bb',
                favorites: true,
                resentFocusTime: moment('2018-01-03').toISOString(),
              },
              mock3: {
                c: 'cc',
                favorites: false,
                resentFocusTime: moment('2018-01-02').toISOString(),
              },
              mock4: {
                d: 'dd',
                favorites: true,
                resentFocusTime: moment('2018-01-01').toISOString(),
              },
            },
          },
        },
      });

      expect(selectors.getFilteredWidget(state))
        .toEqual(Immutable.fromJS([
          {
            a: 'aa',
            favorites: true,
            resentFocusTime: moment('2018-01-04').toISOString(),
          },
          {
            b: 'bb',
            favorites: true,
            resentFocusTime: moment('2018-01-03').toISOString(),
          },
          {
            d: 'dd',
            favorites: true,
            resentFocusTime: moment('2018-01-01').toISOString(),
          },
        ]));
    });
  });

  describe('test getSearchedWidget', () => {
    it('when keyword don\'t exist', () => {
      const state = Immutable.fromJS({
        personal: {
          search: {
            filter: 'ALL',
          },
        },
        share: {
          widgets: {
            byId: {
              mock1: {
                name: 'search-name',
                url: 'not-target-url',
                favorites: true,
                resentFocusTime: moment('2018-01-04').toISOString(),
              },
              mock2: {
                name: 'not-target-name',
                url: 'search-url',
                favorites: true,
                resentFocusTime: moment('2018-01-03').toISOString(),
              },
              mock3: {
                name: 'not-target-name',
                url: 'not-target-url',
                favorites: false,
                resentFocusTime: moment('2018-01-02').toISOString(),
              },
              mock4: {
                name: 'search-name',
                url: 'search-url',
                favorites: true,
                resentFocusTime: moment('2018-01-01').toISOString(),
              },
            },
          },
        },
      });

      expect(selectors.getSearchedWidget(state))
        .toEqual(Immutable.fromJS([
          {
            name: 'search-name',
            url: 'not-target-url',
            favorites: true,
            resentFocusTime: moment('2018-01-04').toISOString(),
          },
          {
            name: 'not-target-name',
            url: 'search-url',
            favorites: true,
            resentFocusTime: moment('2018-01-03').toISOString(),
          },
          {
            name: 'not-target-name',
            url: 'not-target-url',
            favorites: false,
            resentFocusTime: moment('2018-01-02').toISOString(),
          },
          {
            name: 'search-name',
            url: 'search-url',
            favorites: true,
            resentFocusTime: moment('2018-01-01').toISOString(),
          },
        ]));
    });

    it('when keyword exist', () => {
      const state = Immutable.fromJS({
        personal: {
          search: {
            filter: 'ALL',
            keyword: 'search',
          },
        },
        share: {
          widgets: {
            byId: {
              mock1: {
                name: 'search-name',
                url: 'not-target-url',
                favorites: true,
                resentFocusTime: moment('2018-01-04').toISOString(),
              },
              mock2: {
                name: 'not-target-name',
                url: 'search-url',
                favorites: true,
                resentFocusTime: moment('2018-01-03').toISOString(),
              },
              mock3: {
                name: 'not-target-name',
                url: 'not-target-url',
                favorites: true,
                resentFocusTime: moment('2018-01-02').toISOString(),
              },
              mock4: {
                name: 'search-name',
                url: 'search-url',
                favorites: true,
                resentFocusTime: moment('2018-01-01').toISOString(),
              },
            },
          },
        },
      });

      expect(selectors.getSearchedWidget(state))
        .toEqual(Immutable.fromJS([
          {
            name: 'search-name',
            url: 'search-url',
            favorites: true,
            searched: 'both',
            resentFocusTime: moment('2018-01-01').toISOString(),
          },
          {
            name: 'search-name',
            url: 'not-target-url',
            favorites: true,
            searched: 'name',
            resentFocusTime: moment('2018-01-04').toISOString(),
          },
          {
            name: 'not-target-name',
            url: 'search-url',
            favorites: true,
            searched: 'url',
            resentFocusTime: moment('2018-01-03').toISOString(),
          },
        ]));
    });
  });

  it('test getSelectedIndex', () => {
    const state = Immutable.fromJS({
      personal: {
        search: {
          filter: 'ALL',
          keyword: '',
          selectedIndex: 7,
        },
      },
      share: {
        widgets: {
          byId: {
            mock1: {
              name: 'search-name',
              url: 'not-target-url',
              favorites: true,
            },
            mock2: {
              name: 'not-target-name',
              url: 'search-url',
              favorites: true,
            },
            mock3: {
              name: 'not-target-name',
              url: 'not-target-url',
              favorites: true,
            },
            mock4: {
              name: 'search-name',
              url: 'search-url',
              favorites: true,
            },
          },
        },
      },
    });

    expect(selectors.getSelectedIndex(state)).toEqual(3);
  });
});
