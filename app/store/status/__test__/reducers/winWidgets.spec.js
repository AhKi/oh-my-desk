import Immutable from 'immutable';
import * as TYPES from 'actions/actionTypes';
import { BrowserWindow } from 'electron';
import winWidgets from '../../reducers/winWidgets';

describe('test status winWidgets reducer', () => {
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

  describe('should handle REGISTER_NEW_WIDGET_BROWSER_WINDOW', () => {
    const mockWindow = JSON.stringify(new BrowserWindow());
    const initialState = {
      'mock-id': mockWindow,
    };
    const nextState = {};
    const mockAction = {
      type: TYPES.CLOSE_TARGET_WIDGET,
      payload: {
        id: 'mock-id',
      },
    };

    const mockActionInfo = {
      type: TYPES.CLOSE_TARGET_WIDGET,
      payload: {
        id: 'mock-id',
        info: {},
      },
    };

    it('when action.payload.info don\'t exist', () => {
      expect(winWidgets(Immutable.fromJS(initialState), mockAction))
        .toEqual(Immutable.fromJS(initialState));
    });

    it('when action.payload.info exist', () => {
      expect(winWidgets(Immutable.fromJS(initialState), mockActionInfo))
        .toEqual(Immutable.fromJS(nextState));
    });
  });
});
