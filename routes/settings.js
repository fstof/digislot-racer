var dao = require('./dao-settings');

// defaults until we load it from disk
var settings = {
	serialPort: 'COM4'
};

settings.load = function () {
	dao.connect(function (db, cleanup) {
		dao.getSettings(db, function (data) {
			if (data.length > 0) {
				settings.serialPort = data[0].serialPort;
				cleanup();
			} else {
				console.log('no settings found... saving initial')
				dao.saveSettings(db, settings, function (data) {
					console.log('settings saved')
					cleanup();
				});
			}
		});
	});
};

module.exports = settings;
