import * as statusActions from 'actions/status';
import isTrayOpen from '../../reducers/isTrayOpen';

describe('test isTrayOpen reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isTrayOpen(undefined, {})).toBe(initialState);
  });

  it('should handle trayWindowClose', () => {
    expect(isTrayOpen(undefined, statusActions.trayWindowClose())).toBe(false);
  });

  it('should handle trayWindowOpen', () => {
    expect(isTrayOpen(undefined, statusActions.trayWindowOpen())).toBe(true);
  });
});
