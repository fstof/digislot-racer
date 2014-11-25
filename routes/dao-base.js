var Engine = require('tingodb')();

var dao = {};

dao.connect = function (callback) {
	var db = new Engine.Db('./data', {});

	console.log('Connected to embeded db: ' + (db != null));
	callback(db, function () {
		console.log('closing embeded db');
		db.close();
	});
};

module.exports = dao;
