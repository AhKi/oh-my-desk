import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import store from 'store/storeMain';

const storeDataInDisk = () => {
  const configName = 'store';
  const userDataPath = app.getPath('userData');
  const savedPath = path.join(userDataPath, `${configName}.json`);
  const data = store.getState();

  fs.writeFileSync(savedPath, JSON.stringify(data.toJS()));
};

export default storeDataInDisk;
