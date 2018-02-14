import filter from 'store/widget/reducers/filter';
import * as actions from 'store/widget/actions';
import * as FILTER from 'constants/filter';

describe('test widget filter reducer', () => {
  it('should return initialState', () => {
    expect(filter(undefined, {})).toBe(FILTER.LATEST);
  });

  describe('should handle widgetSelectFilter', () => {
    it('when payload === FILTER.OLDEST', () => {
      const payload = FILTER.OLDEST;

      expect(filter(undefined, actions.widgetSelectFilter(payload)))
        .toBe(FILTER.OLDEST);
    });

    it('when payload === FILTER.ACTIVATED', () => {
      const payload = FILTER.ACTIVATED;

      expect(filter(undefined, actions.widgetSelectFilter(payload)))
        .toBe(FILTER.ACTIVATED);
    });
  });
});
