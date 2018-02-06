import Immutable from 'immutable';
import * as selectors from 'store/modal/selectors';

describe('test modal selectors', () => {
  const state = Immutable.fromJS({
    modal: {
      modalProps: {
        mock1: 'mock-1',
        mock2: 'mock-2',
      },
      modalType: 'mock-type',
    },
  });

  it('should select modalProps', () => {
    expect(selectors.modalPropsSelector(state))
      .toEqual({
        mock1: 'mock-1',
        mock2: 'mock-2',
      });
  });

  it('should select modalTypes', () => {
    expect(selectors.modalTypeSelector(state)).toBe('mock-type');
  });
});
