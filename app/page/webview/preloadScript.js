import { ipcRenderer } from 'electron';
import Mousetrap from 'mousetrap';

Mousetrap.bind('command+left', () => {
  window.history.back();
});
Mousetrap.bind('command+right', () => {
  window.history.forward();
});

document.addEventListener('keydown', (e) => {
  let command;
  if (process.platform === 'darwin') {
    command = e.metaKey;
  } else {
    command = e.altKey;
  }

  if (command && e.key === 'r') {
    window.location.reload();
  }
});

window.addEventListener('scroll', () => {
  ipcRenderer.sendToHost('scroll', window.scrollY);
});
