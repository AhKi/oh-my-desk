import { remote } from 'electron';
import { languageSelector } from 'store/reducers/share/config/selectors';
import contextMenu from './contextMenu';
import menu from './menu';
import preference from './preference';
import search from './search';
import update from './update';
import widget from './widget.jsx';

const getMatchedText = () => { // eslint-disable-line consistent-return
  let store;
  let language;
  if (!remote) {
    const storeMain = require('store/storeMain').default; // eslint-disable-line global-require
    store = storeMain.getState();
    language = languageSelector(store);
  } else {
    store = JSON.parse(remote.getGlobal('getReduxState')());
    language = store.config.language; // eslint-disable-line prefer-destructuring
  }

  if (language === 'English') {
    return {
      contextMenu: contextMenu.en,
      menu: menu.en,
      search: search.en,
      preference: preference.en,
      update: update.en,
      widget: widget.en,
    };
  }

  if (language === 'Korean') {
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
