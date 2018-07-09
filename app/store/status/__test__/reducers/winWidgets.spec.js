import Immutable from 'immutable';
import * as TYPES from 'actions/actionTypes';
import * as widgetActions from 'actions/widget';
import { BrowserWindow } from 'electron';
import winWidgets from '../../reducers/winWidgets';

describe.skip('test status winWidgets reducer', () => {
  it('should return initialState', () => {
    expect(winWidgets(undefined, {})).toEqual(Immutable.Map());
  });

  it('should handle REGISTER_NEW_WIDGET_BROWSER_WINDOW', () => {
    const mockWindow = JSON.stringify(new BrowserWindow());
    const mockAction = {
      type: TYPES.REGISTER_NEW_WIDGET_BROWSER_WINDOW,
      payload: {
        id: 'mock-id',
        browserWindow: mockWindow,
      },
    };

    expect(winWidgets(undefined, mockAction)).toEqual(Immutable.Map({
      'mock-id': mockWindow,
    }));
  });

  it('should handle CLOSE_TARGET_WIDGET', () => {
    const mockWindow = JSON.stringify(new BrowserWindow());
    const initialState = {
      'mock-id': mockWindow,
    };
    const nextState = {};

    const mockActionInfo = {
      type: TYPES.CLOSE_TARGET_WIDGET,
      payload: {
        id: 'mock-id',
        info: {},
      },
    };

    expect(winWidgets(Immutable.fromJS(initialState), mockActionInfo))
      .toEqual(Immutable.fromJS(nextState));
  });

  it('should handle REGISTER_NEW_WIDGET_BROWSER_WINDOWS', () => {
    const mockWindow = JSON.stringify(new BrowserWindow());
    const mockIds = ['mock1', 'mock2', 'mock3'];
    const mockWindows = [mockWindow, mockWindow, mockWindow];

    expect(
      winWidgets(
        undefined,
        widgetActions.registerNewWidgetBrowserWindows(mockIds, mockWindows),
      ),
    ).toEqual(Immutable.Map({
      mock1: mockWindow,
      mock2: mockWindow,
      mock3: mockWindow,
    }));
  });
});
