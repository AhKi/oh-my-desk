import Immutable from 'immutable';
import * as FILTER from 'constants/filter';
import * as selectors from 'store/widget/selectors';

describe('test widget selectors', () => {
  it('should select byId', () => {
    const state = Immutable.fromJS({
      widget: {
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

  it('should select currentPage', () => {
    const state = Immutable.fromJS({
      widget: {
        currentPage: 5,
      },
    });

    expect(selectors.currentPageSelector(state))
      .toEqual(5);
  });

  it('should select items', () => {
    const state = Immutable.fromJS({
      widget: {
        items: ['mock1', 'mock2'],
      },
    });

    expect(selectors.itemsSelector(state))
      .toEqual(Immutable.List(['mock1', 'mock2']));
  });

  it('should select selectedId', () => {
    const state = Immutable.fromJS({
      widget: {
        selectedId: 'mock-id',
      },
    });

    expect(selectors.selectedIdSelector(state))
      .toEqual('mock-id');
  });

  it('should select maxPage', () => {
    const state = Immutable.fromJS({
      widget: {
        maxPage: 5,
      },
    });

    expect(selectors.maxPageSelector(state))
      .toEqual(5);
  });

  it('should select filter', () => {
    const state = Immutable.fromJS({
      widget: {
        filter: 'mock-filter',
      },
    });

    expect(selectors.filterSelector(state))
      .toEqual('mock-filter');
  });

  it('should select totalNumber', () => {
    const state = Immutable.fromJS({
      widget: {
        totalNumber: 5,
      },
    });

    expect(selectors.totalNumberSelector(state)).toBe(5);
  });

  it('should select using getWidgetInfo ', () => {
    const state = Immutable.fromJS({
      widget: {
        byId: {
          mock1: {
            id: 'mock1',
            value: 'mock-value-1',
          },
          mock2: {
            id: 'mock2',
            value: 'mock-value-2',
          },
        },
        items: ['mock1', 'mock2'],
        selectedId: 'mock2',
      },
    });

    expect(selectors.getWidgetInfo(state))
      .toEqual([
        {
          id: 'mock1',
          value: 'mock-value-1',
        },
        {
          id: 'mock2',
          value: 'mock-value-2',
        },
      ]);
  });

  describe('should select using getWidgetListWithFilter and getNumberOfItemFilteredList', () => {
    const state = Immutable.fromJS({
      widget: {
        byId: {
          mock1: {
            id: 'mock1',
            isActive: false,
          },
          mock2: {
            id: 'mock2',
            isActive: false,
          },
          mock3: {
            id: 'mock3',
            isActive: true,
          },
          mock4: {
            id: 'mock4',
            isActive: false,
          },
          mock5: {
            id: 'mock5',
            isActive: true,
          },
          mock6: {
            id: 'mock6',
            isActive: false,
          },
          mock7: {
            id: 'mock7',
            isActive: false,
          },
        },
        items: ['mock1', 'mock2', 'mock3', 'mock4', 'mock5', 'mock6', 'mock7'],
      },
    });

    it('when filter === FILTER.LATEST', () => {
      expect(selectors.getWidgetListWithFilter(state.setIn(['widget', 'filter'], FILTER.LATEST)))
        .toEqual([
          {
            id: 'mock1',
            isActive: false,
          },
          {
            id: 'mock2',
            isActive: false,
          },
          {
            id: 'mock3',
            isActive: true,
          },
          {
            id: 'mock4',
            isActive: false,
          },
          {
            id: 'mock5',
            isActive: true,
          },
          {
            id: 'mock6',
            isActive: false,
          },
          {
            id: 'mock7',
            isActive: false,
          },
        ]);

      expect(selectors.getNumberOfItemFilteredList(state.setIn(['widget', 'filter'], FILTER.LATEST)))
        .toBe(7);
    });

    it('when filter === FILTER.OLDEST', () => {
      expect(selectors.getWidgetListWithFilter(state.setIn(['widget', 'filter'], FILTER.OLDEST)))
        .toEqual([
          {
            id: 'mock7',
            isActive: false,
          },
          {
            id: 'mock6',
            isActive: false,
          },
          {
            id: 'mock5',
            isActive: true,
          },
          {
            id: 'mock4',
            isActive: false,
          },
          {
            id: 'mock3',
            isActive: true,
          },
          {
            id: 'mock2',
            isActive: false,
          },
          {
            id: 'mock1',
            isActive: false,
          },
        ]);
      expect(selectors.getNumberOfItemFilteredList(state.setIn(['widget', 'filter'], FILTER.OLDEST)))
        .toBe(7);
    });

    it('when filter === FILTER.OLDEST', () => {
      expect(selectors.getWidgetListWithFilter(state.setIn(['widget', 'filter'], FILTER.ACTIVATED)))
        .toEqual([
          {
            id: 'mock3',
            isActive: true,
          },
          {
            id: 'mock5',
            isActive: true,
          },
        ]);
      expect(selectors.getNumberOfItemFilteredList(state.setIn(['widget', 'filter'], FILTER.ACTIVATED)))
        .toBe(2);
    });

    it('when filter is not matched', () => {
      expect(selectors.getWidgetListWithFilter(state.setIn(['widget', 'filter'], 'DEFAULT')))
        .toEqual([
          {
            id: 'mock1',
            isActive: false,
          },
          {
            id: 'mock2',
            isActive: false,
          },
          {
            id: 'mock3',
            isActive: true,
          },
          {
            id: 'mock4',
            isActive: false,
          },
          {
            id: 'mock5',
            isActive: true,
          },
          {
            id: 'mock6',
            isActive: false,
          },
          {
            id: 'mock7',
            isActive: false,
          },
        ]);
    });
  });

  describe('should select getWidgetFilteredListInPage', () => {
    const state = Immutable.fromJS({
      widget: {
        byId: {
          mock1: {
            id: 'mock1',
            isActive: false,
          },
          mock2: {
            id: 'mock2',
            isActive: false,
          },
          mock3: {
            id: 'mock3',
            isActive: true,
          },
          mock4: {
            id: 'mock4',
            isActive: false,
          },
          mock5: {
            id: 'mock5',
            isActive: true,
          },
          mock6: {
            id: 'mock6',
            isActive: false,
          },
          mock7: {
            id: 'mock7',
            isActive: false,
          },
          mock8: {
            id: 'mock8',
            isActive: false,
          },
          mock9: {
            id: 'mock9',
            isActive: false,
          },
          mock10: {
            id: 'mock10',
            isActive: false,
          },
          mock11: {
            id: 'mock11',
            isActive: false,
          },
        },
        items: ['mock1', 'mock2', 'mock3', 'mock4', 'mock5', 'mock6', 'mock7', 'mock8', 'mock9', 'mock10', 'mock11'],
        filter: FILTER.LATEST,
      },
    });

    it('when currentPage === 1', () => {
      expect(selectors.getWidgetFilteredListInPage(state.setIn(['widget', 'currentPage'], 1)))
        .toEqual([
          {
            id: 'mock1',
            isActive: false,
          },
          {
            id: 'mock2',
            isActive: false,
          },
          {
            id: 'mock3',
            isActive: true,
          },
          {
            id: 'mock4',
            isActive: false,
          },
          {
            id: 'mock5',
            isActive: true,
          },
          {
            id: 'mock6',
            isActive: false,
          },
          {
            id: 'mock7',
            isActive: false,
          },
          {
            id: 'mock8',
            isActive: false,
          },
          {
            id: 'mock9',
            isActive: false,
          },
          {
            id: 'mock10',
            isActive: false,
          },
        ]);
    });

    it('when currentPage === 2', () => {
      expect(selectors.getWidgetFilteredListInPage(state.setIn(['widget', 'currentPage'], 2)))
        .toEqual([
          {
            id: 'mock11',
            isActive: false,
          },
        ]);
    });
  });

  it('should select using getSelectedWidget', () => {
    const state = Immutable.fromJS({
      widget: {
        byId: {
          mock1: {
            id: 'mock1',
            value: 'mock-value-1',
          },
          mock2: {
            id: 'mock2',
            value: 'mock-value-2',
          },
        },
        items: ['mock1', 'mock2'],
        selectedId: 'mock2',
      },
    });

    expect(selectors.getSelectedWidget(state))
      .toEqual(
        {
          id: 'mock2',
          value: 'mock-value-2',
        },
      );
  });
});
