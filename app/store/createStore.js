import { createStore, applyMiddleware } from 'redux';
import { remote } from 'electron';
import Immutable from 'immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import getStoredDataInDisk from 'utils/getStoredDataInDisk';
import rootReducer from './rootReducer';
import broadcastAction from './utils/middleware/broadcastAction';
import identifyAction from './utils/middleware/identifyAction';


const MAIN = 'MAIN';
const store = (scope) => {
  // TODO need verification when use another middleware synchronously
  if (scope === MAIN) {
    const storedData = getStoredDataInDisk();

    return createStore(
      rootReducer,
      Immutable.fromJS(storedData),
      applyMiddleware(broadcastAction),
    );
  }

  const initialState = JSON.parse(remote.getGlobal('getReduxState')());

  return createStore(
    rootReducer,
    Immutable.fromJS(initialState),
    composeWithDevTools(
      applyMiddleware(identifyAction),
    ),
  );
};

export default store;
