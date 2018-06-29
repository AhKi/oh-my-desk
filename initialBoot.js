const path = require('path');
require('babel-register');
require('module-alias/register');

const mainPath = path.join(__dirname, process.argv.splice(2)[0]);
require(mainPath); // eslint-disable-line
