import { createStore, applyMiddleware } from 'redux';
import { remote } from 'electron';
import Immutable from 'immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { composeWithDevTools as remoteComposeWithDevTools } from 'remote-redux-devtools';
import getStoredDataInDisk from 'utils/getStoredDataInDisk';
import rootReducer from './rootReducer';
import categorizeActionInRenderer from './utils/middleware/categorizeActionInRenderer';


const MAIN = 'MAIN';
const store = (scope) => {
  // TODO need verification when use another middleware synchronously
  if (scope === MAIN) {
    const categorizeActionInMain =
      require('./utils/middleware/categorizeActionInMain').default; // eslint-disable-line global-require
    const storedData = getStoredDataInDisk();
    const middleware = applyMiddleware(categorizeActionInMain);
    const attachDevToolsWithMiddleware = process.env.NODE_ENV === 'development' ? remoteComposeWithDevTools({ name: 'oh-my-desk main process' })(middleware) : middleware;

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
