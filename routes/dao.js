var dao = {};

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/digislotRacer';

var Engine = require('tingodb')();

dao.connect = function (callback) {
	MongoClient.connect(url, function (err, db) {
		console.log('Connected to mongo server: ' + (err == null));
		if (!err) {
			callback(db, function () {
				console.log('closing connection to server');
				db.close();
			});
		} else {
			var db = new Engine.Db('./data',{});

			console.log('Connected to embeded db: ' + (db != null));
			callback(db, function () {
				console.log('closing embeded db');
				db.close();
			});
		}
	});
};

dao.findRacers = function (db, callback) {
	var racers = db.collection('racers');
	racers.find({}).toArray(function (err, docs) {
		console.log("Found the following racers");
		console.dir(docs);
		callback(docs);
	});
};
dao.findRacer = function (db, name, callback) {
	var racers = db.collection('racers');
	racers.find({name: new RegExp(name, 'gi')}).toArray(function (err, docs) {
		console.log('found ' + docs.length + ' racers');
		console.dir(docs);
		callback(docs);
	});
};
dao.insertRacer = function (db, racer, callback) {
	var racers = db.collection('racers');
	racers.insert(racer, function (err, result) {
		console.log(err);
		console.log("insert succeeded: " + (err == null));
		callback(result);
	});
};

dao.findCars = function (db, callback) {
	var cars = db.collection('cars');
	cars.find({}).toArray(function (err, docs) {
		console.log("Found the following cars");
		console.dir(docs);
		callback(docs);
	});
};
dao.findCar = function (db, name, callback) {
	var cars = db.collection('cars');
	cars.find({name: new RegExp(name, 'gi')}).toArray(function (err, docs) {
		console.log('found ' + docs.length + ' cars');
		console.dir(docs);
		callback(docs);
	});
};
dao.insertCar = function (db, car, callback) {
	var cars = db.collection('cars');
	cars.insert(car, function (err, result) {
		console.log("insert succeeded: " + (err == null));
		callback(result);
	});
};

var insertDocuments = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('koos');
	// Insert some documents
	collection.insert([
		{a: 1, b: 2}, {a: 2, b: 3}, {a: 3, b: 4}
	], function (err, result) {
		console.log("Inserted 3 documents into the document collection");
		callback(result);
	});
};
var updateDocument = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('koos');
	// Insert some documents
	collection.update({a: 2}
		, {$set: {b: 1}}, function (err, result) {
			console.log('updated ' + result + ' records');
			console.log("Updated the document with the field a equal to 2");
			callback(result);
		});
};
var removeDocument = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('koos');
	// Insert some documents
	collection.remove({a: 3}, function (err, result) {
		console.log("Removed the document with the field a equal to 3");
		callback(result);
	});
};
var findDocuments = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('koos');
	// Find some documents
	collection.find({}).toArray(function (err, docs) {
		console.log("Found the following records");
		console.dir(docs)
		callback(docs);
	});
};

module.exports = dao;
