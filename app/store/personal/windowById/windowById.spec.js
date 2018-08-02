import Immutable from 'immutable';
import { BrowserWindow } from 'electron';
import * as actions from 'actions/status';
import * as updateActions from 'actions/update';
import * as widgetActions from 'actions/widget';
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

  it('should handle updateProgressWindowOpen', () => {
    const mockId = 'mock-id';
    const mockWin = new BrowserWindow();
    const mockResult = Immutable.Map({
      [mockId]: mockWin,
    });

    expect(windowById(undefined, updateActions.updateProgressWindowOpen(mockId, mockWin)))
      .toEqual(mockResult);
  });

  describe('test when close window in windowById', () => {
    const mockId = 'mock-id';
    const mockWin = new BrowserWindow();
    const mockInitial = Immutable.Map({
      [mockId]: mockWin,
    });

    it('should handle closeBrowserWindow', () => {
      expect(windowById(mockInitial, actions.closeBrowserWindow(mockId)))
        .toEqual(Immutable.Map({}));
    });

    it('should handle closeTargetWidget', () => {
      expect(windowById(mockInitial, widgetActions.closeTargetWidget(mockId)))
        .toEqual(Immutable.Map({}));
    });

    it('should handle updateProgressWindowClose', () => {
      expect(windowById(mockInitial, updateActions.updateProgressWindowClose(mockId)))
        .toEqual(Immutable.Map({}));
    });

    describe('should handle closePreference', () => {
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
});
