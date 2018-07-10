import Immutable from 'immutable';
import { BrowserWindow } from 'electron';
import * as selectors from './selectors';

describe('test personal selectors', () => {
  it('should handle windowById', () => {
    const mockSelected = Immutable.Map({
      mock1: new BrowserWindow(),
      mock2: new BrowserWindow(),
    });
    const mockState = Immutable.Map({
      personal: Immutable.Map({
        windowById: mockSelected,
      }),
    });

    expect(selectors.windowByIdSelector(mockState)).toEqual(mockSelected);
  });

  it('should select mySelfId', () => {
    const mockState = Immutable.Map({
      personal: Immutable.Map({
        mySelfId: 'mock-id',
      }),
    });

    expect(selectors.mySelfIdSelector(mockState)).toEqual('mock-id');
  });
});
