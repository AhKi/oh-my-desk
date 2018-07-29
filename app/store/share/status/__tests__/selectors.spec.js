import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test status selectors', () => {
  it('should select preferenceId', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          preferenceId: 'mock-id',
        },
      },
    });

    expect(selectors.preferenceIdSelector(initialState))
      .toEqual('mock-id');
  });

  it('should select lang', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          lang: 'English',
        },
      },
    });

    expect(selectors.langSelector(initialState))
      .toEqual('English');
  });

  it('should select autoLaunch', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          autoLaunch: false,
        },
      },
    });

    expect(selectors.autoLaunchSelector(initialState))
      .toEqual(false);
  });

  it('should select autoActiveWidget', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          autoActiveWidget: false,
        },
      },
    });

    expect(selectors.autoActiveWidgetSelector(initialState))
      .toEqual(false);
  });

  it('should select widgetMode', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          widgetMode: 'MOBILE',
        },
      },
    });

    expect(selectors.widgetModeSelector(initialState))
      .toEqual('MOBILE');
  });

  it('should select isTrayOpen', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          isTrayOpen: false,
        },
      },
    });

    expect(selectors.isTrayOpenSelector(initialState))
      .toEqual(false);
  });
});
