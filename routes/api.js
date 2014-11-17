var express = require('express');
var router = express.Router();

router.get('/cars', function (req, res) {
	var cars = req.db.get('cars');
	cars.find({}, {},
		function (e, docs) {
			res.json(docs);
		}
	);
});

router.get('/findCar/:name', function (req, res) {
	var cars = req.db.get('cars');
	var name = req.params.name;
	cars.find({"name": new RegExp(name, 'gi')}, {},
		function (e, docs) {
			res.json(docs);
		}
	);
});

router.get('/racers', function (req, res) {
	var cars = req.db.get('racers');
	cars.find({}, {},
		function (e, docs) {
			res.json(docs);
		}
	);
});

router.get('/racer/:name', function (req, res) {
	var cars = req.db.get('racers');
	var name = req.params.name;
	cars.find({"name": new RegExp(name, 'gi')}, {},
		function (e, docs) {
			res.json(docs);
		}
	);
});


/* POST to Add User Service */
router.get('/add', function (req, res) {

	// Set our internal DB variable
	var db = req.db;

	// Get our form values. These rely on the "name" attributes
	var coll = req.query.coll;
	var name = req.query.name;
	var description = req.query.description;

	// Set our collection
	var collection = null;
	try {
		collection = db.get(coll);
	} catch (ex) {
	}

	if (collection == null) {
		db.createCollection(coll, function (err, collection) {
			collection.insert({
				"name": name,
				"description": description
			});
		});
	} else {
		collection.insert({
			"name": name,
			"description": description
		}, function (err, doc) {
			console.log(err);
			console.log(doc);
		});
	}

});


module.exports = router;
