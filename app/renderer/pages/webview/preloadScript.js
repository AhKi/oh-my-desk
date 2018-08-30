import Mousetrap from 'mousetrap';

Mousetrap.bind('command+left', () => {
  window.history.back();
});
Mousetrap.bind('command+right', () => {
  window.history.forward();
});
