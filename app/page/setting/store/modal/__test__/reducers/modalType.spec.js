import modalType from 'setting/store/modal/reducers/modalType';
import * as actions from 'setting/store/modal/actions';

describe('test modal modalType reducer', () => {
  it('should return initial state', () => {
    expect(modalType(undefined, {})).toBe('');
  });

  it('should handle modalClose', () => {
    expect(modalType(undefined, actions.modalClose())).toBe('');
  });

  it('should handle modalOpen', () => {
    const payload = 'mock-type';

    expect(modalType(undefined, actions.modalOpen(payload))).toBe('mock-type');
  });
});
