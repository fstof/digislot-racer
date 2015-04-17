var debug = require('debug')('app:dao-base');
var Engine = require('tingodb')();

var dao = {};

dao.connect = function (callback) {
	var db = new Engine.Db('./data', {});

	debug('Connected to embeded db: ' + (db != null));
	callback(db, function () {
		debug('closing embeded db');
		db.close();
	});
};

module.exports = dao;
