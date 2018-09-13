import * as actions from 'actions/update';
import { setInitialStore } from 'actions/setting';
import currentProgress from '../currentProgress';

describe('test currentProgress reducer', () => {
  const initialState = 0;

  it('should test initialState', () => {
    expect(currentProgress(undefined, {})).toBe(initialState);
  });

  it('should handle setInitialStore', () => {
    expect(currentProgress(150, setInitialStore())).toBe(initialState);
  });

  it('should handle updateProgressCancel', () => {
    expect(currentProgress(150, actions.updateProgressCancel())).toBe(initialState);
  });

  it('should handle updateDownloadProgress', () => {
    expect(currentProgress(undefined, actions.updateDownloadProgress({
      transferred: 12345678,
    }))).toBe(12.3);
  });
});
