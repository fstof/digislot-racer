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

router.get('/drivers', function (req, res) {
	dao.connect(function (db, cleanup) {
		dao.findDrivers(db, function (drivers) {
			res.json(drivers);
			cleanup();
		});
	});
});
router.get('/findDriver/:name', function (req, res) {
	var name = req.params.name;
	dao.connect(function (db, cleanup) {
		dao.findDriver(db, name, function (data) {
			res.json(data);
			cleanup()
		})
	})
});
router.post('/addDriver', function (req, res) {
	var newDriver = req.body.driver;
	dao.connect(function (db, cleanup) {
		dao.insertDriver(db, newDriver, function (data) {
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
router.post('/updateDriver', function (req, res) {
	var newDriver = req.body.driver;
	dao.connect(function (db, cleanup) {
		dao.saveDriver(db, newDriver, function (data) {
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
router.post('/deleteDriver', function (req, res) {
	var driverToDelete = req.body.driver;

	dao.connect(function (db, cleanup) {
		dao.deleteDriver(db, driverToDelete, function (data) {
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
