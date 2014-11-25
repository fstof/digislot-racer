var dao = require('./dao-base');

dao.getSettings = function (db, callback) {
	var settings = db.collection('settings');
	settings.find({}).toArray(function (err, docs) {
		console.log('found all ' + docs.length + ' settings');
		console.dir(docs);
		callback(docs);
	});
};
dao.saveSettings = function (db, newSettings, callback) {
	var settings = db.collection('settings');

	settings.update({_id: newSettings._id}, {$set: newSettings}, function (err, result) {
		console.log('updated ' + result + ' records');
		if (result == 0) {
			settings.insert(newSettings, function (err, result) {
				console.log("Inserted Settings: err: " + err + ' result: ' + result);
				callback(result);
			})
		} else {
			console.log('Updated Settings')
			callback(result);
		}
	});
};

module.exports = dao;
