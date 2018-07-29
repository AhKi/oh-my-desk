import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test modal selectors', () => {
  it('should select modalProps', () => {
    const mockStore = Immutable.fromJS({
      personal: {
        modal: {
          modalProps: {
            a: 'mock-props',
          },
          modalType: 'mock-type',
        },
      },
    });

    expect(selectors.modalPropsSelector(mockStore)).toEqual(Immutable.Map({
      a: 'mock-props',
    }));
  });

  it('should select modalType', () => {
    const mockStore = Immutable.fromJS({
      personal: {
        modal: {
          modalProps: 'mock-props',
          modalType: 'mock-type',
        },
      },
    });

    expect(selectors.modalTypeSelector(mockStore)).toEqual('mock-type');
  });
});
