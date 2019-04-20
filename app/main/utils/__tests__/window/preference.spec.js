import { BrowserWindow } from 'electron';
import { PREFERENCE_PATH } from 'config';
import { preference, openPreference } from 'main/utils/window/preference';


describe('test window/preference', () => {
  describe('when preference is null', () => {
    afterAll(() => {
      jest.clearAllMocks();
    });
    const mockWindow = new BrowserWindow();
    BrowserWindow.mockImplementationOnce(() => mockWindow);

    openPreference();

    it('match preference', () => {
      expect(preference).toEqual(mockWindow);
    });

    it('match loadURL', () => {
      expect(preference.loadURL).toHaveBeenCalledTimes(1);
      expect(preference.loadURL).toHaveBeenCalledWith(PREFERENCE_PATH);
    });

    it('match on.close', () => {
      expect(mockWindow.on).toHaveBeenCalledTimes(1);
      expect(mockWindow.on).toHaveBeenCalledWith('close', expect.any(Function));

      expect(preference).toEqual(mockWindow);
      const cb = mockWindow.on.mock.calls[0][1];

      cb();
      expect(preference).toEqual(null);
    });
  });

  it('when preference is not null', () => {
    const mockWindow = new BrowserWindow();
    BrowserWindow.mockImplementationOnce(() => mockWindow);

    openPreference();
    openPreference();

    expect(preference.show).toHaveBeenCalledTimes(1);
  });
});
