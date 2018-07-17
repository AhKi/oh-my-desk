import * as TYPES from 'actions/actionTypes';
import * as openPreference from 'utils/process/openPreference';
import * as autoLaunch from 'utils/autoLaunch';
import preferenceController from '.';

describe('test preference controller', () => {
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
});
