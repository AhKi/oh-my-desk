const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  /**
 * @param {opts} 
 * {
 *   configName: ... (the name of config file)
 *   defualts: ... (if there is no config file, it will be replace config file)
 * }
 */
  constructor(opts) {
    // renderer has to get `app` module via remote, main gets it directly
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, opts.configName + '.json');
    this.data = parseDataFile(this.path, opts.defaults);
    this.save();
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    this.save();
  }

  getAll() {
    return this.data;
  }

  save() {
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    console.dir(error)
    return defaults;
  }
}

module.exports = Store;