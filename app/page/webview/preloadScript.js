import { ipcRenderer } from 'electron';
import Mousetrap from 'mousetrap';

Mousetrap.bind('command+left', () => {
  window.history.back();
});
Mousetrap.bind('command+right', () => {
  window.history.forward();
});
Mousetrap.bind('command+r', () => {
  window.location.reload();
});

window.addEventListener('scroll', () => {
  ipcRenderer.sendToHost('scroll', window.scrollY);
});
