import * as actions from 'actions/search';
import isTrayOpen from '../isTrayOpen';

describe('test isTrayOpen reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isTrayOpen(undefined, {})).toBe(initialState);
  });

  it('should handle searchTrayClose', () => {
    expect(isTrayOpen(undefined, actions.searchTrayClose())).toBe(false);
  });

  it('should handle searchTrayOpen', () => {
    expect(isTrayOpen(undefined, actions.searchTrayOpen())).toBe(true);
  });
});
