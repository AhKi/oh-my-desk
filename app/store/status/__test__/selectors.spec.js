import Immutable from 'immutable';
import * as selectors from '../selectors';

describe('test status selector', () => {
  it('should select mySelfIdSelector', () => {
    const mockId = 'mock-id';
    const state = Immutable.fromJS({
      status: {
        mySelfId: mockId,
      },
    });

    expect(selectors.mySelfIdSelector(state))
      .toEqual(mockId);
  });

  it('should select winPreferenceSelector', () => {
    const mockWindow = {};
    const state = Immutable.fromJS({
      status: {
        winPreference: mockWindow,
      },
    });

    expect(selectors.winPreferenceSelector(state))
      .toEqual(Immutable.Map(mockWindow));
  });

  it('should select winWidgetsSelector', () => {
    const state = Immutable.fromJS({
      status: {
        winWidgets: {
          mock_1: { a: 'mockA' },
          mock_2: { b: 'mockB' },
        },
      },
    });

    expect(selectors.winWidgetsSelector(state))
      .toEqual(Immutable.fromJS({
        mock_1: { a: 'mockA' },
        mock_2: { b: 'mockB' },
      }));
  });
});
