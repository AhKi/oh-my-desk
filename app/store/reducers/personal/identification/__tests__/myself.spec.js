import * as widgetActions from 'actions/widget';
import mySelf from '../myself';

describe('test mySelf reducer', () => {
  it('should return initialState', () => {
    expect(mySelf(undefined, {})).toBe(null);
  });

  it('should handle widgetAllocateIdTarget action', () => {
    expect(mySelf(undefined, widgetActions.widgetAllocateIdTarget('mock-id')))
      .toBe('mock-id');
  });
});
