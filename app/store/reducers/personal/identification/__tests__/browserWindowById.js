import Immutable from 'immutable';
import { BrowserWindow } from 'electron';
import { openBrowserWindow } from 'actions/window';
import * as updateActions from 'actions/update';
import * as widgetActions from 'actions/widget';
import browserWindowById from '../browserWindowById';

describe('test browserWindowById reducer', () => {
  it('should match initialState', () => {
    expect(browserWindowById(undefined, {})).toEqual(Immutable.Map());
  });

  describe('should handle openBrowserWindow', () => {
    it('when number of id is one', () => {
      const mockId = 'mock-id';
      const mockWin = new BrowserWindow();
      const mockResult = Immutable.Map({
        [mockId]: mockWin,
      });

      expect(browserWindowById(undefined, openBrowserWindow(mockId, mockWin)))
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

      expect(browserWindowById(undefined, openBrowserWindow(mockId, mockWinArray)))
        .toEqual(mockResult);
    });
  });

  it('should handle updateProgressWindowOpen', () => {
    const mockId = 'mock-id';
    const mockWin = new BrowserWindow();
    const mockResult = Immutable.Map({
      [mockId]: mockWin,
    });

    expect(browserWindowById(undefined, updateActions.updateProgressWindowOpen(mockId, mockWin)))
      .toEqual(mockResult);
  });

  describe('test when close window in browserWindowById', () => {
    const mockId = 'mock-id';
    const mockWin = new BrowserWindow();
    const mockInitial = Immutable.Map({
      [mockId]: mockWin,
    });

    it('should handle widgetClose', () => {
      expect(browserWindowById(mockInitial, widgetActions.widgetClose(mockId)))
        .toEqual(Immutable.Map({}));
    });

    it('should handle widgetClosed', () => {
      expect(browserWindowById(mockInitial, widgetActions.widgetClosed(mockId)))
        .toEqual(Immutable.Map({}));
    });

    it('should handle updateProgressWindowClose', () => {
      expect(browserWindowById(mockInitial, updateActions.updateProgressWindowClose(mockId)))
        .toEqual(Immutable.Map({}));
    });
  });
});
