import { BrowserWindow } from 'electron';
import { openBrowserWindow } from 'actions/window';
import * as CATEGORY from 'actions/constant/actionCategory';
import * as TYPES from 'actions/constant/actionTypes';

describe('test window action', () => {
  const mockId = 'mock-id';
  const mockMeta = {
    category: CATEGORY.SELF,
  };

  it('should handle openBrowserWindow', () => {
    const mockWindow = JSON.stringify(new BrowserWindow());
    const mockAction = {
      type: TYPES.OPEN_BROWSER_WINDOW,
      payload: {
        id: mockId,
        browserWindow: mockWindow,
      },
      meta: mockMeta,
    };

    expect(openBrowserWindow(mockId, mockWindow))
      .toEqual(mockAction);
  });
});
