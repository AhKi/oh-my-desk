import * as widgetActions from 'actions/widget';
import mySelfId from '.';

describe('test mySelfId reducer', () => {
  it('should return initialState', () => {
    expect(mySelfId(undefined, {})).toBe(null);
  });

  it('should handle allocateIdTargetWidget action', () => {
    expect(mySelfId(undefined, widgetActions.allocateIdTargetWidget('mock-id')))
      .toBe('mock-id');
  });
});
