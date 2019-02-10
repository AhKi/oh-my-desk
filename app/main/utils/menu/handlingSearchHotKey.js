import { globalShortcut } from 'electron';
import { toggleSearch } from 'main/utils/window/search';

function handlingSearchHotKey(key) {
  globalShortcut.unregisterAll();
  globalShortcut.register(key, () => {
    toggleSearch();
  });
}

export default handlingSearchHotKey;
