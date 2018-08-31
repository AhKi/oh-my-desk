import * as actions from 'actions/update';
import { setInitialStore } from 'actions/status';
import isDownloadFetch from '../../reducers/isDownloadFetch';

describe('test isDownloadFetch reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isDownloadFetch(undefined, {})).toBe(initialState);
  });

  it('should handle updateDownloadRequest', () => {
    expect(isDownloadFetch(false, actions.updateDownloadRequest()))
      .toBe(true);
  });

  it('should handle updateDownloadSuccess', () => {
    expect(isDownloadFetch(true, actions.updateDownloadSuccess()))
      .toBe(false);
  });

  it('should handle updateDownloadFailure', () => {
    expect(isDownloadFetch(true, actions.updateDownloadFailure()))
      .toBe(false);
  });

  it('should handle setInitialStore', () => {
    expect(isDownloadFetch(true, setInitialStore()))
      .toBe(false);
  });
});
