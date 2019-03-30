import * as TYPES from 'actions/constant/actionTypes';
import * as autoLaunch from 'main/utils/window/autoLaunch';
import createMenu from 'main/utils/menu/createMenu';
import preferenceController from '../preference';

jest.mock('electron-builder-http');
jest.mock('main/utils/menu/createMenu');
jest.mock('electron-updater');

describe('test preference controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle TOGGLE_OPEN_APP_WHEN_LOGIN', () => {
    const mockAutoLaunch = jest.spyOn(autoLaunch, 'default');
    mockAutoLaunch.mockImplementation(jest.fn());
    const mockAction = {
      type: TYPES.TOGGLE_OPEN_APP_WHEN_LOGIN,
    };

    preferenceController(mockAction);

    expect(mockAutoLaunch).toHaveBeenCalledTimes(1);
    expect(mockAutoLaunch).toHaveBeenCalledWith();
  });

  it('should handle SET_LANGUAGE_ENGLISH', () => {
    const mockAction = {
      type: TYPES.SET_LANGUAGE_ENGLISH,
    };

    preferenceController(mockAction);

    expect(createMenu).toHaveBeenCalledTimes(1);
    expect(createMenu).toHaveBeenCalledWith();
  });

  it('should handle SET_LANGUAGE_KOREAN', () => {
    const mockAction = {
      type: TYPES.SET_LANGUAGE_KOREAN,
    };

    preferenceController(mockAction);

    expect(createMenu).toHaveBeenCalledTimes(1);
    expect(createMenu).toHaveBeenCalledWith();
  });
});
