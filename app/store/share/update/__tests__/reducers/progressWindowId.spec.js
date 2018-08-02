import * as actions from 'actions/update/index';
import progressWindowId from '../../reducers/progressWindowId';

describe('test newVersion reducer', () => {
  const initialState = null;

  it('should test initialState', () => {
    expect(progressWindowId(undefined, {})).toBe(initialState);
  });

  it('should handle updateProgressWindowOpen', () => {
    expect(progressWindowId(undefined, actions.updateProgressWindowOpen('mock-id')))
      .toBe('mock-id');
  });

  it('should handle updateProgressWindowClose', () => {
    expect(progressWindowId('mock-id', actions.updateProgressWindowClose()))
      .toBe(initialState);
  });
});
