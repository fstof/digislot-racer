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
	var racers = req.db.get('racers');
	racers.find({}, {},
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

router.post('/racer', function (req, res) {
	// Set our internal DB variable
	var db = req.db;

	var name = req.body.name;

	var racers = db.get('racers');

	racers.insert({
		"name": name
	}, function (err, doc) {
		console.log(err);
		console.log(doc);
	});
});




module.exports = router;
