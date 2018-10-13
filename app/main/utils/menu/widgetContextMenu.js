import { remote, shell, clipboard } from 'electron';
import i18n from 'constants/i18n';

const { Menu } = remote;

const widgetContextMenu = (widget) => {
  const text = i18n().contextMenu;
  const template = [
    {
      label: text.back,
      enabled: widget.canGoBack(),
      click: () => { widget.goBack(); },
    },
    {
      label: text.forward,
      enabled: widget.canGoForward(),
      click: () => { widget.goForward(); },
    },
    {
      label: text.reload,
      click: () => { widget.reload(); },
    },
    { type: 'separator' },
    { label: text.cut, role: 'cut' },
    { label: text.copy, role: 'copy' },
    { label: text.paste, role: 'paste' },
    { label: text.selectAll, role: 'selectall' },
    { type: 'separator' },
    {
      label: text.copyUrl,
      click: () => {
        const url = widget.getWebContents().getURL();

        clipboard.writeText(url);
      },
    },
    {
      label: text.openBrowser,
      click: () => {
        const url = widget.getWebContents().getURL();
        shell.openExternal(url);
      },
    },
  ];

  const menu = Menu.buildFromTemplate(template);

  menu.popup(remote.getCurrentWindow());
};

export default widgetContextMenu;
