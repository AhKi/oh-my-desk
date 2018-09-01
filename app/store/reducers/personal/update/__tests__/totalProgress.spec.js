import * as actions from 'actions/update';
import { setInitialStore } from 'actions/status';
import totalProgress from '../totalProgress';

describe('test totalProgress reducer', () => {
  const initialState = 0;

  it('should test initialState', () => {
    expect(totalProgress(undefined, {})).toBe(initialState);
  });

  it('should handle setInitialStore', () => {
    expect(totalProgress(150, setInitialStore())).toBe(initialState);
  });

  it('should handle updateProgressCancel', () => {
    expect(totalProgress(150, actions.updateProgressCancel())).toBe(initialState);
  });

  it('should handle updateDownloadProgress', () => {
    expect(totalProgress(undefined, actions.updateDownloadProgress({
      total: 12345678,
    }))).toBe(12.3);
  });
});
