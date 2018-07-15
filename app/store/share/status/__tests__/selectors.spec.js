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
});
