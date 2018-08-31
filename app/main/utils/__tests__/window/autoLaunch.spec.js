import AutoLaunchLib from 'auto-launch';
import * as selector from 'store/share/status/selectors';
import autoLaunch from 'main/utils/window/autoLaunch';

jest.mock('auto-launch');

describe('test autoLaunch function', () => {
  let mockIsEnable = false;
  const enable = jest.fn();
  const disable = jest.fn();
  AutoLaunchLib.mockImplementation(() => ({
    isEnabled: () => Promise.resolve(mockIsEnable),
    enable,
    disable,
  }));
  const autoLaunchSelector = jest
    .spyOn(selector, 'autoLaunchSelector');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should test autoLaunch', () => {
    autoLaunch();

    expect(AutoLaunchLib).toHaveBeenCalledTimes(1);
    expect(AutoLaunchLib).toHaveBeenCalledWith({
      name: 'oh-my-desk',
      mac: {
        useLaunchAgent: true,
      },
    });
  });

  describe('test new AutoLaunch.isEnabled', () => {
    it('when isEnable === true', () => {
      autoLaunchSelector.mockImplementationOnce(() => false);
      mockIsEnable = true;
      autoLaunch();

      return Promise.resolve()
        .then(() => {
          expect(disable).toHaveBeenCalledTimes(1);
        });
    });

    it('when isEnable === false', () => {
      autoLaunchSelector.mockImplementationOnce(() => true);
      mockIsEnable = false;
      autoLaunch();

      return Promise.resolve()
        .then(() => {
          expect(enable).toHaveBeenCalledTimes(1);
        });
    });

    it('when doesn\'t match above case', () => {
      autoLaunchSelector.mockImplementationOnce(() => true);
      mockIsEnable = true;
      autoLaunch();

      return Promise.resolve()
        .then(() => {
          expect(enable).toHaveBeenCalledTimes(0);
          expect(disable).toHaveBeenCalledTimes(0);
        });
    });
  });
});
