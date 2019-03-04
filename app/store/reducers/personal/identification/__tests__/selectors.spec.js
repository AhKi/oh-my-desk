import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test identification selectors', () => {
  it('should select myself', () => {
    const mockStore = Immutable.fromJS({
      personal: {
        identification: {
          myself: 'mock-id',
        },
      },
    });

    expect(selectors.myselfSelector(mockStore)).toEqual('mock-id');
  });
});
