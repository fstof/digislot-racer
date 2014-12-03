var dao = require('./dao-base');

dao.findDrivers = function (db, callback) {
	var drivers = db.collection('drivers');
	drivers.find({}).toArray(function (err, docs) {
		console.log('found all ' + docs.length + ' drivers');
		console.dir(docs);
		callback(docs);
	});
};
dao.findDriver = function (db, name, callback) {
	var drivers = db.collection('drivers');
	drivers.find({name: new RegExp(name, 'gi')}).toArray(function (err, docs) {
		console.log('found ' + docs.length + ' drivers with name ' + name);
		console.dir(docs);
		callback(docs);
	});
};
dao.insertDriver = function (db, driver, callback) {
	var drivers = db.collection('drivers');
	drivers.insert(driver, function (err, result) {
		console.log("insert driver succeeded: " + (err == null));
		callback(result);
	});
};
dao.saveDriver = function (db, driver, callback) {
	var drivers = db.collection('drivers');
	drivers.update({_id: driver._id}, {$set: driver}, function (err, result) {
		console.log("update driver succeeded: " + (err == null));
		callback(result);
	});
};
dao.deleteDriver = function (db, driver, callback) {
	var drivers = db.collection('drivers');
	drivers.remove(driver, function (err, result) {
		console.log("remove driver succeeded: " + (err == null));
		callback(result);
	});
};

dao.findCars = function (db, callback) {
	var cars = db.collection('cars');
	cars.find({}).toArray(function (err, docs) {
		console.log('found all ' + docs.length + ' cars');
		console.dir(docs);
		callback(docs);
	});
};
dao.findCar = function (db, name, callback) {
	var cars = db.collection('cars');
	cars.find({name: new RegExp(name, 'gi')}).toArray(function (err, docs) {
		console.log('found ' + docs.length + ' cars with name ' + name);
		console.dir(docs);
		callback(docs);
	});
};
dao.insertCar = function (db, car, callback) {
	var cars = db.collection('cars');
	cars.insert(car, function (err, result) {
		console.log("insert car succeeded: " + (err == null));
		callback(result);
	});
};
dao.saveCar = function (db, car, callback) {
	var cars = db.collection('cars');
	cars.update({_id: car._id}, {$set: car}, function (err, result) {
		console.log("update car succeeded: " + (err == null));
		callback(result);
	});
};
dao.deleteCar = function (db, car, callback) {
	var cars = db.collection('cars');
	cars.remove(car, function (err, result) {
		console.log("remove car succeeded: " + (err == null));
		callback(result);
	});
};

dao.findTracks = function (db, callback) {
	var tracks = db.collection('tracks');
	tracks.find({}).toArray(function (err, docs) {
		console.log('found all ' + docs.length + ' tracks');
		console.dir(docs);
		callback(docs);
	});
};
dao.findTrack = function (db, name, callback) {
	var tracks = db.collection('tracks');
	tracks.find({name: new RegExp(name, 'gi')}).toArray(function (err, docs) {
		console.log('found ' + docs.length + ' tracks with name ' + name);
		console.dir(docs);
		callback(docs);
	});
};
dao.insertTrack = function (db, track, callback) {
	var tracks = db.collection('tracks');
	tracks.insert(track, function (err, result) {
		console.log("insert track succeeded: " + (err == null));
		callback(result);
	});
};
dao.saveTrack = function (db, track, callback) {
	var tracks = db.collection('tracks');
	tracks.update({_id: track._id}, {$set: track}, function (err, result) {
		console.log("update track succeeded: " + (err == null));
		callback(result);
	});
};
dao.deleteTrack = function (db, track, callback) {
	var tracks = db.collection('tracks');
	tracks.remove(track, function (err, result) {
		console.log("remove track succeeded: " + (err == null));
		callback(result);
	});
};

dao.findLapsForTrack = function (db, track, callback) {
	var laps = db.collection('laps');
	laps.find({track_id: track._id}).toArray(function (err, docs) {
		console.log('found ' + docs.length + ' laps for track ' + track.name);
		console.dir(docs);
		callback(docs);
	});
};

dao.insertLap = function (db, lap, callback) {
	var laps = db.collection('laps');
	laps.insert(lap, function (err, result) {
		console.log("insert lap succeeded: " + (err == null));
		callback(result);
	});
};
dao.allLaps = function (db, callback) {
	var laps = db.collection('laps');
	laps.find({}).toArray(function (err, docs) {
		console.log('found all ' + docs.length + ' laps');
		console.dir(docs);
		callback(docs);
	});
};

module.exports = dao;
