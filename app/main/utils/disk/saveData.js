import fs from 'fs';
import * as PATH from 'constants/path';
import store from 'store/storeMain';

const saveData = () => {
  const data = store.getState().get('share');

  fs.writeFileSync(`${PATH.CONFIG_PATH}/${PATH.SETTING_FILE_NAME}`, JSON.stringify(data.toJS()));
};

export default saveData;
