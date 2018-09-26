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

  it('should select isCheckUpdateWhenStart', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          isCheckUpdateWhenStart: false,
        },
      },
    });

    expect(selectors.isCheckUpdateWhenStartSelector(initialState))
      .toEqual(false);
  });

  it('should select isDownloadFetch', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          isDownloadFetch: false,
        },
      },
    });

    expect(selectors.isDownloadFetchSelector(initialState))
      .toEqual(false);
  });

  it('should select isDownloadUpdateWhenStart', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          isDownloadUpdateWhenStart: false,
        },
      },
    });

    expect(selectors.isDownloadUpdateWhenStartSelector(initialState))
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


  it('should select isRestartAfterUpdate', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          isRestartAfterUpdate: false,
        },
      },
    });

    expect(selectors.isRestartAfterUpdateSelector(initialState))
      .toEqual(false);
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

  it('should select isUpdateCheckFetch', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          isUpdateCheckFetch: false,
        },
      },
    });

    expect(selectors.isUpdateCheckFetchSelector(initialState))
      .toEqual(false);
  });

  it('should select isUpdateCheckOnManual', () => {
    const initialState = Immutable.fromJS({
      share: {
        status: {
          isUpdateCheckOnManual: false,
        },
      },
    });

    expect(selectors.isUpdateCheckOnManualSelector(initialState))
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
