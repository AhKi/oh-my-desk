import { BrowserWindow } from 'electron';
import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test identification selectors', () => {
  it('should select myself', () => {
    const mockStore = Immutable.fromJS({
      personal: {
        identification: {
          myself: 'mock-id',
        },
      },
    });

    expect(selectors.myselfSelector(mockStore)).toEqual('mock-id');
  });

  it('should handle browserWindowById', () => {
    const mockSelected = Immutable.Map({
      mock1: new BrowserWindow(),
      mock2: new BrowserWindow(),
    });
    const mockState = Immutable.Map({
      personal: Immutable.Map({
        identification: Immutable.Map({
          browserWindowById: mockSelected,
        }),
      }),
    });

    expect(selectors.browserWindowByIdSelector(mockState)).toEqual(mockSelected);
  });
});
