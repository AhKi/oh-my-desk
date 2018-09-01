import * as actions from 'actions/update';
import downloadProgress from '../downloadProgress';

describe('test downloadProgress reducer', () => {
  const initialState = null;

  it('should test initialState', () => {
    expect(downloadProgress(undefined, {})).toBe(initialState);
  });

  it('should handle updateProgressWindowOpen', () => {
    expect(downloadProgress(undefined, actions.updateProgressWindowOpen('mock-id')))
      .toBe('mock-id');
  });

  it('should handle updateProgressWindowClose', () => {
    expect(downloadProgress('mock-id', actions.updateProgressWindowClose()))
      .toBe(initialState);
  });
});
