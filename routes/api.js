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
router.post('/addCar', function (req, res) {
	var newCar = req.body.car;
	dao.connect(function (db, cleanup) {
		dao.insertCar(db, newCar, function (data) {
			if (data) {
				data[0].success = true;
			} else {
				data = {success: false};
			}
			res.json(data[0]);
			cleanup();
		});
	});
});
router.post('/updateCar', function (req, res) {
	var newCar = req.body.car;
	dao.connect(function (db, cleanup) {
		dao.saveCar(db, newCar, function (data) {
			if (data > 0) {
				data = {success: true};
			} else {
				data = {success: false};
			}
			res.json(data);
			cleanup();
		});
	});
});
router.post('/deleteCar', function (req, res) {
	var carToDelete = req.body.car;

	dao.connect(function (db, cleanup) {
		dao.deleteCar(db, carToDelete, function (data) {
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
router.post('/addRacer', function (req, res) {
	var newRacer = req.body.racer;
	dao.connect(function (db, cleanup) {
		dao.insertRacer(db, newRacer, function (data) {
			if (data) {
				data[0].success = true;
			} else {
				data = {success: false};
			}
			res.json(data[0]);
			cleanup();
		});
	});
});
router.post('/updateRacer', function (req, res) {
	var newRacer = req.body.racer;
	dao.connect(function (db, cleanup) {
		dao.saveRacer(db, newRacer, function (data) {
			if (data > 0) {
				data = {success: true};
			} else {
				data = {success: false};
			}
			res.json(data);
			cleanup();
		});
	});
});
router.post('/deleteRacer', function (req, res) {
	var racerToDelete = req.body.racer;

	dao.connect(function (db, cleanup) {
		dao.deleteRacer(db, racerToDelete, function (data) {
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
