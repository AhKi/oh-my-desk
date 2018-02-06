import selectedId from 'store/widget/reducers/selectedId';
import * as actions from 'store/widget/actions';

describe('test widget selectedId reducer', () => {
  it('should return default value', () => {
    expect(selectedId(undefined, {})).toBe(null);
  });

  it('should handle widgetListSelect', () => {
    const payload = 'mock-selected-id';

    expect(selectedId(undefined, actions.widgetListSelect(payload)))
      .toBe('mock-selected-id');
  });

  describe('should handle widgetListSelect', () => {
    it('when don\'t exist action.payload[id]', () => {
      const state = 'mock-selected-id';
      const payload = {
        mock1: {},
        mock2: {},
      };
      expect(selectedId(state, actions.widgetListInfoStore(payload)))
        .toBe(null);
    });

    it('when don\'t exist action.payload[id]', () => {
      const state = 'mock1';
      const payload = {
        mock1: {},
        mock2: {},
      };
      expect(selectedId(state, actions.widgetListInfoStore(payload)))
        .toBe(state);
    });
  });
});
