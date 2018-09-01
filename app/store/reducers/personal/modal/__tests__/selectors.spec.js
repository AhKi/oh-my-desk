import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test modal selectors', () => {
  it('should select props', () => {
    const mockStore = Immutable.fromJS({
      personal: {
        modal: {
          content: 'mock-type',
          props: {
            a: 'mock-props',
          },
        },
      },
    });

    expect(selectors.propsSelector(mockStore)).toEqual(Immutable.Map({
      a: 'mock-props',
    }));
  });

  it('should select content', () => {
    const mockStore = Immutable.fromJS({
      personal: {
        modal: {
          content: 'mock-type',
          props: 'mock-props',
        },
      },
    });

    expect(selectors.contentSelector(mockStore)).toEqual('mock-type');
  });
});
