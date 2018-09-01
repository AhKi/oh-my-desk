import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test select about update', () => {
  it('should select currentProgress', () => {
    const initialState = Immutable.fromJS({
      personal: {
        update: {
          currentProgress: 123.4,
        },
      },
    });

    expect(selectors.currentProgressSelector(initialState))
      .toEqual(123.4);
  });

  it('should select totalProgress', () => {
    const initialState = Immutable.fromJS({
      personal: {
        update: {
          totalProgress: 123.4,
        },
      },
    });

    expect(selectors.totalProgressSelector(initialState))
      .toEqual(123.4);
  });
});
