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
});
