const path = require('path');

const ROOT_PATH = path.join(__dirname, '..');

module.exports = {
  ROOT_PATH,
  APP_PATH: path.join(ROOT_PATH, 'app'),
  BUILD_PATH: path.join(ROOT_PATH, 'build'),
  CONFIG_PATH: path.join(ROOT_PATH, 'config'),
  TEST_PATH: path.join(ROOT_PATH, 'test'),
};
