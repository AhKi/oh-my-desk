import { createStore, applyMiddleware } from 'redux';
import { remote } from 'electron';
import Immutable from 'immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import getStoredDataInDisk from 'utils/getStoredDataInDisk';
import rootReducer from './rootReducer';
import categorizeActionInMain from './utils/middleware/categorizeActionInMain';
import categorizeActionInRenderer from './utils/middleware/categorizeActionInRenderer';


const MAIN = 'MAIN';
const store = (scope) => {
  // TODO need verification when use another middleware synchronously
  if (scope === MAIN) {
    const storedData = getStoredDataInDisk();

    return createStore(
      rootReducer,
      Immutable.fromJS(storedData),
      applyMiddleware(categorizeActionInMain),
    );
  }

  const initialState = JSON.parse(remote.getGlobal('getReduxState')());

  return createStore(
    rootReducer,
    Immutable.fromJS(initialState),
    composeWithDevTools(
      applyMiddleware(categorizeActionInRenderer),
    ),
  );
};

export default store;
