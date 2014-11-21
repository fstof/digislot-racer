var express = require('express');
var dao = require('./dao');
var router = express.Router();

router.get('/cars', function (req, res) {
	dao.connect(function (db, cleanup) {
		dao.findCars(db, function (data) {
			res.json(data);
			cleanup();
		})
	})
});
router.get('/findCar/:name', function (req, res) {
	var name = req.params.name;
	dao.connect(function (db, cleanup) {
		dao.findCar(db, name, function (data) {
			res.json(data);
			cleanup();
		})
	});
});
router.post('/car', function (req, res) {
	var newCar = {
		name: req.body.name,
		description: req.body.description
	};
	dao.connect(function (db, cleanup) {
		dao.insertCar(db, newCar, function (data) {
			if (data) {
				for (var i = 0; i < data.length; i++) {
					data[i].success = true;
				}
			} else {
				data = [{success: false}];
			}
			res.json(data);
			cleanup();
		});
	});
});

router.get('/racers', function (req, res) {
	dao.connect(function (db, cleanup) {
		dao.findRacers(db, function (racers) {
			res.json(racers);
			cleanup();
		});
	});
});
router.get('/findRacer/:name', function (req, res) {
	var name = req.params.name;
	dao.connect(function (db, cleanup) {
		dao.findRacer(db, name, function (data) {
			res.json(data);
			cleanup()
		})
	})
});
router.post('/racer', function (req, res) {
	var newRacer = {
		name: req.body.name
	};
	dao.connect(function (db, cleanup) {
		dao.insertRacer(db, newRacer, function (data) {
			if (data) {
				for (var i = 0; i < data.length; i++) {
					data[i].success = true;
				}
			} else {
				data = [{success: false}];
			}
			res.json(data);
			cleanup();
		});
	});
});

module.exports = router;
