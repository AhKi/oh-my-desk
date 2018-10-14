import * as actions from 'actions/setting';
import * as TYPES from 'actions/constant/actionTypes';
import * as CATEGORY from 'actions/constant/actionCategory';

describe('test setting action', () => {
  it('should handle setInitialStore', () => {
    const mockAction = {
      type: TYPES.SET_INITIAL_STORE,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.setInitialStore()).toEqual(mockAction);
  });

  it('should handle setLanguageEnglish', () => {
    const mockAction = {
      type: TYPES.SET_LANGUAGE_ENGLISH,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.setLanguageEnglish()).toEqual(mockAction);
  });

  it('should handle setLanguageKorean', () => {
    const mockAction = {
      type: TYPES.SET_LANGUAGE_KOREAN,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.setLanguageKorean()).toEqual(mockAction);
  });

  it('should handle setWhenQuitApp', () => {
    const mockAction = {
      type: TYPES.SET_WHEN_QUIT_APP,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.setWhenQuitApp()).toEqual(mockAction);
  });

  it('should handle toggleOpenAppWhenLogin', () => {
    const mockAction = {
      type: TYPES.TOGGLE_OPEN_APP_WHEN_LOGIN,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.toggleOpenAppWhenLogin()).toEqual(mockAction);
  });

  it('should handle toggleOpenWidgetWhenStart', () => {
    const mockAction = {
      type: TYPES.TOGGLE_OPEN_WIDGET_WHEN_START,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.toggleOpenWidgetWhenStart()).toEqual(mockAction);
  });

  it('should handle toggleWidgetDefaultUserAgent', () => {
    const mockAction = {
      type: TYPES.TOGGLE_WIDGET_DEFAULT_USER_AGENT,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.toggleWidgetDefaultUserAgent()).toEqual(mockAction);
  });
});
