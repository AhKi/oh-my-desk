import { createStore, applyMiddleware } from 'redux';
import { remote } from 'electron';
import Immutable from 'immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
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

    return createStore(
      rootReducer,
      Immutable.fromJS({ share: storedData }),
      applyMiddleware(categorizeActionInMain),
    );
  }

  const initialShare = JSON.parse(remote.getGlobal('getReduxState')());

  return createStore(
    rootReducer,
    Immutable.fromJS({ share: initialShare }),
    composeWithDevTools(
      applyMiddleware(categorizeActionInRenderer),
    ),
  );
};

export default store;
