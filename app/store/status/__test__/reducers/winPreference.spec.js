import { BrowserWindow } from 'electron';
import * as preferenceActions from 'actions/preference';
import winPreference from '../../reducers/winPreference';

describe.skip('test winPreference reducer', () => {
  it('should return initialState', () => {
    expect(winPreference(undefined, {})).toBe(null);
  });

  it('should handle openPreference action', () => {
    const mockWin = new BrowserWindow();
    expect(winPreference(undefined, preferenceActions.openPreference(mockWin)))
      .toBe(mockWin);
  });

  it('should handle closePreference action', () => {
    const mockWin = new BrowserWindow();
    expect(winPreference(mockWin, preferenceActions.closePreference()))
      .toBe(null);
  });
});
