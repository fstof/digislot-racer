var debug = require('debug')('app:dao-settings');
var dao = require('./dao-base');

dao.getSettings = function (db, callback) {
	var settings = db.collection('settings');
	settings.find({}).toArray(function (err, docs) {
		debug(docs);
		callback(docs);
	});
};
dao.saveSettings = function (db, newSettings, callback) {
	var settings = db.collection('settings');

	settings.update({_id: newSettings._id}, {$set: newSettings}, function (err, result) {
		debug('updated ' + result + ' records');
		if (!result || result == 0) {
			settings.insert(newSettings, function (err, result) {
				debug("Inserted Settings: err: " + err + ' result: ' + result);
				callback(result);
			})
		} else {
			debug('Updated Settings')
			callback(result);
		}
	});
};

module.exports = dao;
