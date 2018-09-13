import * as TYPES from 'actions/constant/actionTypes';
import trayBar from 'main/utils/menu/trayMenuBar';
import searchController from '../search';

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
