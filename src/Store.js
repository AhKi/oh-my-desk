const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
	/**
 * @param { opts }
 * {
 *   configName: ... (the name of config file)
 *   defualts: ... (if there is no config file, it will be replace config file)
 * }
 */
	constructor(opts) {
		// renderer has to get `app` module via remote, main gets it directly
		this.userDataPath = (electron.app || electron.remote.app).getPath('userData');
		this.path = path.join(this.userDataPath, `${opts.configName}.json`);
		this.data = this.parseDataFile(opts.defaults);
		this.save();
	}

	get(key) {
		return this.data[key];
	}

	set(key, val) {
		this.data[key] = val;
		this.save();
	}

	delete(key) {
		delete this.data[key];
		this.save();
	}

	getAll() {
		return this.data;
	}

	save() {
		if (!fs.existsSync(this.userDataPath)) fs.mkdirSync(this.userDataPath);

		fs.writeFile(this.path, JSON.stringify(this.data), (err) => {
			if (err) throw new Error(err);
		});
	}

	parseDataFile(defaults) {
		let returnValue = defaults;

		if (!fs.existsSync(this.filePath)) {
			return defaults;
		}

		try {
			returnValue = JSON.parse(fs.readFileSync(this.filePath));
		} catch (error) {
			throw new Error(error);
		}

		return returnValue;
	}
}


module.exports = Store;