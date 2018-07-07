import { BrowserWindow } from 'electron';
import * as TYPES from 'actions/actionTypes';
import * as actions from '.';

describe('test preference actions', () => {
  it('should handle openPreference', () => {
    const mockWin = new BrowserWindow();
    const mockAction = {
      type: TYPES.OPEN_PREFERENCE,
      payload: {
        win: mockWin,
      },
    };

    expect(actions.openPreference(mockWin)).toEqual(mockAction);
  });

  it('should handle deletePreference', () => {
    const mockAction = {
      type: TYPES.CLOSE_PREFERENCE,
    };

    expect(actions.closePreference()).toEqual(mockAction);
  });
});
