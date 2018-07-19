import { remote } from 'electron';
import storeMain from 'store/storeMain';
import { langSelector } from 'store/share/status/selectors';
import contextMenu from './contextMenu';
import menu from './menu';
import preference from './preference';

const getMatchedText = () => { // eslint-disable-line consistent-return
  let store;
  let lang;
  if (!remote) {
    store = storeMain.getState();
    lang = langSelector(store);
  } else {
    store = JSON.parse(remote.getGlobal('getReduxState')());
    lang = store.status.lang; // eslint-disable-line prefer-destructuring
  }

  if (lang === 'English') {
    return {
      contextMenu: contextMenu.en,
      menu: menu.en,
      preference: preference.en,
    };
  }

  if (lang === 'Korean') {
    return {
      contextMenu: contextMenu.ko,
      menu: menu.ko,
      preference: preference.ko,
    };
  }
};

export default getMatchedText;
