import Immutable from 'immutable';
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
