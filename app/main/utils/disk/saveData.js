import fs from 'fs';
import { SETTING_FILE_PATH } from 'config';
import store from 'store/storeMain';

const saveData = () => {
  const data = store.getState().get('share');

  fs.writeFileSync(SETTING_FILE_PATH, JSON.stringify(data.toJS()));
};

export default saveData;
