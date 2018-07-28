import * as TYPES from 'actions/actionTypes';
import * as openPreference from 'utils/process/openPreference';
import * as autoLaunch from 'utils/autoLaunch';
import createMenu from 'utils/process/createMenu';
import preferenceController from '.';

jest.mock('utils/process/createMenu');

describe('test preference controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle OPEN_PREFERENCE', () => {
    const mockOpenPreference = jest.spyOn(openPreference, 'default');
    mockOpenPreference.mockImplementation(jest.fn());
    const mockAction = {
      type: TYPES.OPEN_PREFERENCE,
    };

    preferenceController(mockAction);

    expect(mockOpenPreference).toHaveBeenCalledTimes(1);
    expect(mockOpenPreference).toHaveBeenCalledWith();
  });

  it('should handle TOGGLE_AUTO_LAUNCH', () => {
    const mockAutoLaunch = jest.spyOn(autoLaunch, 'default');
    mockAutoLaunch.mockImplementation(jest.fn());
    const mockAction = {
      type: TYPES.TOGGLE_AUTO_LAUNCH,
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
