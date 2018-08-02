import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test update selectors', () => {
  it('should select currentProgress', () => {
    const initialState = Immutable.fromJS({
      share: {
        update: {
          currentProgress: 123.4,
        },
      },
    });

    expect(selectors.currentProgressSelector(initialState))
      .toEqual(123.4);
  });

  it('should select isAutoUpdate', () => {
    const initialState = Immutable.fromJS({
      share: {
        update: {
          isAutoUpdate: false,
        },
      },
    });

    expect(selectors.isAutoUpdateSelector(initialState))
      .toEqual(false);
  });

  it('should select isAutoCheckUpdate', () => {
    const initialState = Immutable.fromJS({
      share: {
        update: {
          isAutoCheckUpdate: false,
        },
      },
    });

    expect(selectors.isAutoCheckUpdateSelector(initialState))
      .toEqual(false);
  });

  it('should select isCheckFetch', () => {
    const initialState = Immutable.fromJS({
      share: {
        update: {
          isCheckFetch: false,
        },
      },
    });

    expect(selectors.isCheckFetchSelector(initialState))
      .toEqual(false);
  });

  it('should select isDownloadFetch', () => {
    const initialState = Immutable.fromJS({
      share: {
        update: {
          isDownloadFetch: false,
        },
      },
    });

    expect(selectors.isDownloadFetchSelector(initialState))
      .toEqual(false);
  });

  it('should select isRestartAfterUpdate', () => {
    const initialState = Immutable.fromJS({
      share: {
        update: {
          isRestartAfterUpdate: false,
        },
      },
    });

    expect(selectors.isRestartAfterUpdateSelector(initialState))
      .toEqual(false);
  });

  it('should select newVersion', () => {
    const initialState = Immutable.fromJS({
      share: {
        update: {
          newVersion: 'new-version',
        },
      },
    });

    expect(selectors.newVersionSelector(initialState))
      .toEqual('new-version');
  });

  it('should select progressWindowId', () => {
    const initialState = Immutable.fromJS({
      share: {
        update: {
          progressWindowId: 'mock-id',
        },
      },
    });

    expect(selectors.progressWindowIdSelector(initialState))
      .toEqual('mock-id');
  });

  it('should select releaseNotes', () => {
    const initialState = Immutable.fromJS({
      share: {
        update: {
          releaseNotes: 'mock-release-note',
        },
      },
    });

    expect(selectors.releaseNotesSelector(initialState))
      .toEqual('mock-release-note');
  });

  it('should select skipVersion', () => {
    const initialState = Immutable.fromJS({
      share: {
        update: {
          skipVersion: 'mock-version',
        },
      },
    });

    expect(selectors.skipVersionSelector(initialState))
      .toEqual('mock-version');
  });

  it('should select totalProgress', () => {
    const initialState = Immutable.fromJS({
      share: {
        update: {
          totalProgress: 123.4,
        },
      },
    });

    expect(selectors.totalProgressSelector(initialState))
      .toEqual(123.4);
  });
});
