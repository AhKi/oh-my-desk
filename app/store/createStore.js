import { createStore, applyMiddleware } from 'redux';
import { remote } from 'electron';
import Immutable from 'immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import getData from 'main/utils/disk/getData';
import rootReducer from './rootReducer';
import categorizeActionInRenderer from './utils/middleware/categorizeActionInRenderer';

const MAIN = 'MAIN';
const store = (scope) => {
  // TODO need verification when use another middleware synchronously
  if (scope === MAIN) {
    const categorizeActionInMain =
      require('./utils/middleware/categorizeActionInMain').default; // eslint-disable-line global-require
    const storedData = getData();
    const middleware = applyMiddleware(categorizeActionInMain);
    const attachDevToolsWithMiddleware = process.env.IS_DEVTOOLS ?
      require('remote-redux-devtools').composeWithDevTools({ name: 'oh-my-desk main process' })(middleware) : middleware; // eslint-disable-line global-require

    return createStore(
      rootReducer,
      Immutable.fromJS({ share: storedData }),
      attachDevToolsWithMiddleware,
    );
  }

  const initialShare = JSON.parse(remote.getGlobal('getReduxState')());
  const middleware = applyMiddleware(categorizeActionInRenderer);
  const attachDevToolsWithMiddleware = process.env.NODE_ENV === 'development' ? composeWithDevTools(middleware) : middleware;

  return createStore(
    rootReducer,
    Immutable.fromJS({ share: initialShare }),
    attachDevToolsWithMiddleware,
  );
};

export default store;
