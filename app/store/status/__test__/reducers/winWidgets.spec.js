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
});
