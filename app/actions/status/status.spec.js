import { BrowserWindow } from 'electron';
import * as actions from 'actions/status';
import * as TYPES from 'actions/actionTypes';
import * as CATEGORY from 'actions/category';

describe('test status action', () => {
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

    expect(actions.openBrowserWindow(mockId, mockWindow))
      .toEqual(mockAction);
  });

  it('should handle closeBrowserWindow', () => {
    const mockAction = {
      type: TYPES.CLOSE_BROWSER_WINDOW,
      payload: {
        id: mockId,
      },
      meta: mockMeta,
    };

    expect(actions.closeBrowserWindow(mockId))
      .toEqual(mockAction);
  });
});
