import * as TYPES from 'actions/actionTypes';
import trayBar from 'utils/process/trayMenuBar';
import searchController from '.';

describe('test search controller', () => {
  it('should handle SEARCH_WINDOW_HIDE', () => {
    trayBar.hideWindow = jest.fn();
    const mockAction = {
      type: TYPES.SEARCH_WINDOW_HIDE,
    };
    searchController(mockAction);

    expect(trayBar.hideWindow).toHaveBeenCalledTimes(1);
    expect(trayBar.hideWindow).toHaveBeenCalledWith();
  });
});
