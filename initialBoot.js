const path = require('path');
require('babel-register');
require('module-alias/register');

const mainPath = path.join(__dirname, 'app/main');
require(mainPath); // eslint-disable-line
