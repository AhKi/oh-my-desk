import { clipboard, remote, shell } from 'electron';
import widgetContextMenu from '../../process/widgetContextMenu';

jest.mock('electron');

describe('test widgetContextMenu', () => {
  const canGoBack = jest.fn();
  const canGoForward = jest.fn();
  const goBack = jest.fn();
  const goForward = jest.fn();
  const reload = jest.fn();
  const getWebContents = () => ({
    getURL: jest.fn(() => 'mock-url'),
  });
  remote.getGlobal = jest.fn(() => () => JSON.stringify({ status: { lang: 'English' } }));

  const mockWebview = {
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    reload,
    getWebContents,
  };

  describe('should test widgetContentMenu', () => {
    const buildFromTemplate = jest.spyOn(remote.Menu, 'buildFromTemplate');

    widgetContextMenu(mockWebview);

    const template = buildFromTemplate.mock.calls[0][0];

    it('should call buildFromTemplate', () => {
      expect(buildFromTemplate).toHaveBeenCalledTimes(1);
    });

    it('should call menu.popup', () => {
      const { popup } = buildFromTemplate.mock.results[0].value;

      expect(popup).toHaveBeenCalledTimes(1);
      expect(popup).toHaveBeenCalledWith(remote.getCurrentWindow());
    });

    describe('should test template callback function', () => {
      it('should test menu of back', () => {
        const menuBackClick = template[0].click;

        expect(goBack).toHaveBeenCalledTimes(0);
        menuBackClick();
        expect(goBack).toHaveBeenCalledTimes(1);
        expect(goBack).toHaveBeenCalledWith();
      });

      it('should test menu of forward', () => {
        const menuForwardClick = template[1].click;

        expect(goForward).toHaveBeenCalledTimes(0);
        menuForwardClick();
        expect(goForward).toHaveBeenCalledTimes(1);
        expect(goForward).toHaveBeenCalledWith();
      });

      it('should test menu of reload', () => {
        const menuReloadClick = template[2].click;

        expect(reload).toHaveBeenCalledTimes(0);
        menuReloadClick();
        expect(reload).toHaveBeenCalledTimes(1);
        expect(reload).toHaveBeenCalledWith();
      });

      it('should test menu of copyUrl', () => {
        const menuCopyUrlClick = template[9].click;

        menuCopyUrlClick();

        expect(clipboard.writeText).toHaveBeenCalledTimes(1);
        expect(clipboard.writeText).toHaveBeenCalledWith('mock-url');
      });

      it('should test menu of openBrowser', () => {
        const menuOpenBrowserClick = template[10].click;

        menuOpenBrowserClick();

        expect(shell.openExternal).toHaveBeenCalledTimes(1);
        expect(shell.openExternal).toHaveBeenCalledWith('mock-url');
      });
    });
  });
});
