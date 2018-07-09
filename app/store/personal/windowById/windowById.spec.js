import Immutable from 'immutable';
import { BrowserWindow } from 'electron';
import * as actions from 'actions/status';
import windowById from '.';

describe('test windowById reducer', () => {
  it('should match initialState', () => {
    expect(windowById(undefined, {})).toEqual(Immutable.Map());
  });

  it('should handle openBrowserWindow', () => {
    const mockId = 'mock-id';
    const mockWin = new BrowserWindow();
    const mockResult = Immutable.Map({
      [mockId]: mockWin,
    });

    expect(windowById(undefined, actions.openBrowserWindow(mockId, mockWin)))
      .toEqual(mockResult);
  });

  it('should handle closeBrowserWindow', () => {
    const mockId = 'mock-id';
    const mockWin = new BrowserWindow();
    const mockInitial = Immutable.Map({
      [mockId]: mockWin,
    });

    expect(windowById(mockInitial, actions.closeBrowserWindow(mockId)))
      .toEqual(Immutable.Map({}));
  });
});
