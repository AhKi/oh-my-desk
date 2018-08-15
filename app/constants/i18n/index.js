import { remote } from 'electron';
import { langSelector } from 'store/share/status/selectors';
import contextMenu from './contextMenu';
import menu from './menu';
import preference from './preference';
import search from './search';
import update from './update';
import widget from './widget';

const getMatchedText = () => { // eslint-disable-line consistent-return
  let store;
  let lang;
  if (!remote) {
    const storeMain = require('store/storeMain').default; // eslint-disable-line global-require
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
      search: search.en,
      preference: preference.en,
      update: update.en,
      widget: widget.en,
    };
  }

  if (lang === 'Korean') {
    return {
      contextMenu: contextMenu.ko,
      menu: menu.ko,
      search: search.ko,
      preference: preference.ko,
      update: update.ko,
      widget: widget.ko,
    };
  }
};

export default getMatchedText;
