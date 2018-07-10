import Immutable from 'immutable';
import { BrowserWindow } from 'electron';
import * as actions from 'actions/status';
import windowById from '.';

describe('test windowById reducer', () => {
  it('should match initialState', () => {
    expect(windowById(undefined, {})).toEqual(Immutable.Map());
  });

  describe('should handle openBrowserWindow', () => {
    it('when number of id is one', () => {
      const mockId = 'mock-id';
      const mockWin = new BrowserWindow();
      const mockResult = Immutable.Map({
        [mockId]: mockWin,
      });

      expect(windowById(undefined, actions.openBrowserWindow(mockId, mockWin)))
        .toEqual(mockResult);
    });

    it('when id are array', () => {
      const mockWin = new BrowserWindow();
      const mockId = ['mock1', 'mock2'];
      const mockWinArray = [mockWin, mockWin];
      const mockResult = Immutable.Map({
        mock1: mockWin,
        mock2: mockWin,
      });

      expect(windowById(undefined, actions.openBrowserWindow(mockId, mockWinArray)))
        .toEqual(mockResult);
    });
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

  describe('should handle closePreference', () => {
    const mockId = 'mock-id';
    const mockWin = new BrowserWindow();
    const mockInitial = Immutable.Map({
      [mockId]: mockWin,
    });

    it('when exist payload.id', () => {
      expect(windowById(mockInitial, actions.closeBrowserWindow(mockId)))
        .toEqual(Immutable.Map({}));
    });

    it('when don\'t exist payload.id', () => {
      expect(windowById(mockInitial, actions.closeBrowserWindow()))
        .toEqual(mockInitial);
    });
  });
});
