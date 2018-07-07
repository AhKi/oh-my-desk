import { BrowserWindow } from 'electron';
import * as actions from '.';
import * as TYPES from '../actionTypes';

const TARGET = 'TARGET';

describe('test action about widget', () => {
  const mockId = 'mock-id';
  const mockInfo = {
    name: 'mock-name',
    url: 'mock-url',
    isOpen: false,
  };

  it('should handle allocateIdTargetWidget', () => {
    const mockAction = {
      type: TYPES.ALLOCATE_ID_TARGET_WIDGET,
      payload: {
        id: mockId,
      },
      meta: {
        id: mockId,
        source: TARGET,
      },
    };

    expect(actions.allocateIdTargetWidget(mockId))
      .toEqual(mockAction);
  });

  it('should handle closeTargetWidget', () => {
    const mockAction = {
      type: TYPES.CLOSE_TARGET_WIDGET,
      payload: {
        id: mockId,
        info: mockInfo,
      },
    };

    expect(actions.closeTargetWidget(mockId, mockInfo))
      .toEqual(mockAction);
  });

  it('should handle deleteTargetWidget', () => {
    const mockAction = {
      type: TYPES.DELETE_TARGET_WIDGET,
      payload: {
        id: mockId,
      },
    };

    expect(actions.deleteTargetWidget(mockId))
      .toEqual(mockAction);
  });

  it('should handle registerNewWidget', () => {
    const mockAction = {
      type: TYPES.REGISTER_NEW_WIDGET,
      payload: {
        id: mockId,
        info: mockInfo,
      },
    };

    expect(actions.registerNewWidget(mockId, mockInfo))
      .toEqual(mockAction);
  });

  it('should handle registerNewWidgetBrowserWindow', () => {
    const mockWindow = JSON.stringify(new BrowserWindow());
    const mockAction = {
      type: TYPES.REGISTER_NEW_WIDGET_BROWSER_WINDOW,
      payload: {
        id: mockId,
        browserWindow: mockWindow,
      },
    };

    expect(actions.registerNewWidgetBrowserWindow(mockId, mockWindow))
      .toEqual(mockAction);
  });

  it('should handle registerNewWidgetBrowserWindows', () => {
    const mockWindow = JSON.stringify(new BrowserWindow());
    const mockIds = ['mock1', 'mock2', 'mock3'];
    const mockBrowserWindows = [mockWindow, mockWindow, mockWindow];
    const mockAction = {
      type: TYPES.REGISTER_NEW_WIDGET_BROWSER_WINDOWS,
      payload: {
        ids: mockIds,
        browserWindows: mockBrowserWindows,
      },
    };

    expect(actions.registerNewWidgetBrowserWindows(mockIds, mockBrowserWindows))
      .toEqual(mockAction);
  });

  it('should handle showTargetWidget', () => {
    const mockAction = {
      type: TYPES.SHOW_TARGET_WIDGET,
      payload: {
        id: mockId,
      },
    };

    expect(actions.showTargetWidget(mockId))
      .toEqual(mockAction);
  });


  it('should handle updateTargetWidgetInfo', () => {
    const mockAction = {
      type: TYPES.UPDATE_TARGET_WIDGET_INFO,
      payload: {
        id: mockId,
        info: mockInfo,
      },
    };

    expect(actions.updateTargetWidgetInfo(mockId, mockInfo))
      .toEqual(mockAction);
  });
});
