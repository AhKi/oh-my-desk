import { remote, shell, clipboard } from 'electron';
import i18n from 'constants/i18n';

const { Menu } = remote;

const widgetContextMenu = (webview) => {
  const text = i18n().contextMenu;
  const template = [
    {
      label: text.back,
      enabled: webview.canGoBack(),
      click: () => { webview.goBack(); },
    },
    {
      label: text.forward,
      enabled: webview.canGoForward(),
      click: () => { webview.goForward(); },
    },
    {
      label: text.reload,
      click: () => { webview.reload(); },
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
        const url = webview.getWebContents().getURL();

        clipboard.writeText(url);
      },
    },
    {
      label: text.openBrowser,
      click: () => {
        const url = webview.getWebContents().getURL();
        shell.openExternal(url);
      },
    },
  ];

  const menu = Menu.buildFromTemplate(template);

  menu.popup(remote.getCurrentWindow());
};

export default widgetContextMenu;
