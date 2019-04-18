const { CONFIG_PATH } = require('../path');

require('@babel/register')({
  configFile: `${CONFIG_PATH}/babel/babel.config.js`,
});
