import { remote, shell } from 'electron';

const { Menu } = remote;

const widgetContextMenu = (webview) => {
  const template = [
    {
      label: 'Back',
      enabled: webview.canGoBack(),
      click: () => { webview.goBack(); },
    },
    {
      label: 'Forward',
      enabled: webview.canGoForward(),
      click: () => { webview.goForward(); },
    },
    {
      label: 'Reload',
      click: () => { webview.reload(); },
    },
    { type: 'separator' },
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { role: 'selectall' },
    { type: 'separator' },
    {
      label: 'Copy Current URL',
      click: () => {
        const url = webview.getWebContents().getURL();
        const body = document.querySelector('body');
        const textarea = document.createElement('textarea');

        textarea.value = url;
        body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        body.removeChild(textarea);
      },
    },
    {
      label: 'Open Browser',
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
