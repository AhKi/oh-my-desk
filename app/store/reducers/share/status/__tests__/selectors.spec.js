import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test status selectors', () => {
  it('should select isLaunchAppWhenLogin', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          isLaunchAppWhenLogin: false,
        },
      },
    });

    expect(selectors.isLaunchAppWhenLoginSelector(initialState))
      .toEqual(false);
  });

  it('should select isOpenWidgetWhenStart', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          isOpenWidgetWhenStart: false,
        },
      },
    });

    expect(selectors.isOpenWidgetWhenStartSelector(initialState))
      .toEqual(false);
  });

  it('should select isUrlCheckFetch', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          isUrlCheckFetch: false,
        },
      },
    });

    expect(selectors.isUrlCheckFetchSelector(initialState))
      .toEqual(false);
  });
});
