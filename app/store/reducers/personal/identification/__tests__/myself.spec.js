import * as widgetActions from 'actions/widget';
import mySelf from '../myself';

describe('test mySelf reducer', () => {
  it('should return initialState', () => {
    expect(mySelf(undefined, {})).toBe(null);
  });

  it('should handle allocateIdTargetWidget action', () => {
    expect(mySelf(undefined, widgetActions.allocateIdTargetWidget('mock-id')))
      .toBe('mock-id');
  });
});
