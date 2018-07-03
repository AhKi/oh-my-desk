import * as TYPES from 'actions/actionTypes';
import * as actions from '.';

describe('test setting actions', () => {
  it('should handle settingSelectWidget', () => {
    const mockAction = {
      type: TYPES.SETTING_SELECT_WIDGET,
      payload: {
        id: 'mock-id',
      },
    };

    expect(actions.settingSelectWidget('mock-id')).toEqual(mockAction);
  });
});
