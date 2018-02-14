import * as actions from 'store/modal/actions';
import modalProps from 'store/modal/reducers/modalProps';
import Immutable from 'immutable';

describe('test modal modalProps reducer', () => {
  it('should return initial state', () => {
    expect(modalProps(undefined, {})).toBe(Immutable.Map());
  });

  it('should handle modalOpen', () => {
    const mockObj = {
      mock1: 'mock1',
      mock2: 'mock2',
    };

    expect(modalProps({}, actions.modalOpen(null, mockObj)))
      .toEqual(Immutable.fromJS(mockObj));
  });

  it('should handle modalClose', () => {
    expect(modalProps({}, actions.modalClose())).toBe(Immutable.Map());
  });
});
