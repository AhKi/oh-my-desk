import * as actions from 'actions/widget';
import isUrlCheckFetch from '../isUrlCheckFetch';

describe('test isUrlCheckFetch reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isUrlCheckFetch(undefined, {})).toBe(initialState);
  });

  it('should handle widgetUrlCheckRequest', () => {
    expect(isUrlCheckFetch(undefined, actions.widgetUrlCheckRequest())).toBe(true);
  });

  it('should handle widgetUrlCheckSuccess', () => {
    expect(isUrlCheckFetch(undefined, actions.widgetUrlCheckSuccess())).toBe(false);
  });
});
