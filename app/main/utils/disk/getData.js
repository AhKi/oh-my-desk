import fs from 'fs';
import * as PATH from 'constants/path';
import * as SETTING from 'constants/setting';

const getData = () => {
  const STORED_PATH = `${PATH.CONFIG_PATH}/${PATH.SETTING_FILE_NAME}`;
  if (!fs.existsSync(STORED_PATH)) {
    return JSON.parse(SETTING.defaultWidgets);
  }

  const storedData = fs.readFileSync(STORED_PATH, { encoding: 'utf-8' });

  return JSON.parse(storedData);
};

export default getData;
