import fs from 'fs';
import {
  DEFAULT_SETTING,
  SETTING_FILE_PATH,
} from 'config';

const getData = () => {
  if (!fs.existsSync(SETTING_FILE_PATH)) {
    return DEFAULT_SETTING;
  }

  const storedData = fs.readFileSync(SETTING_FILE_PATH, { encoding: 'utf-8' });

  return JSON.parse(storedData);
};

export default getData;
