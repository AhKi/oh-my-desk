import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test config selectors', () => {
  it('should select language', () => {
    const initialState = Immutable.fromJS({
      share: {
        config: {
          language: 'English',
        },
      },
    });

    expect(selectors.languageSelector(initialState))
      .toEqual('English');
  });

  it('should select defaultUserAgent', () => {
    const initialState = Immutable.fromJS({
      share: {
        config: {
          defaultUserAgent: 'MOBILE',
        },
      },
    });

    expect(selectors.defaultUserAgentSelector(initialState))
      .toEqual('MOBILE');
  });

  it('should select newVersion', () => {
    const initialState = Immutable.fromJS({
      share: {
        config: {
          newVersion: 'new-version',
        },
      },
    });

    expect(selectors.newVersionSelector(initialState))
      .toEqual('new-version');
  });

  it('should select releaseNotes', () => {
    const initialState = Immutable.fromJS({
      share: {
        config: {
          releaseNotes: 'new-release',
        },
      },
    });

    expect(selectors.releaseNotesSelector(initialState))
      .toEqual('new-release');
  });

  it('should select skipVersion', () => {
    const initialState = Immutable.fromJS({
      share: {
        config: {
          skipVersion: 'skip-version',
        },
      },
    });

    expect(selectors.skipVersionSelector(initialState))
      .toEqual('skip-version');
  });
});
