import * as TYPES from 'actions/actionTypes';
import * as openPreference from 'utils/process/openPreference';
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
});
