var express = require('express');
var dao = require('../dao/dao-data');
var settings = require('../dao/dao-settings');
var router = express.Router();

router.get('/cars', function (req, res) {
	dao.connect(function (db, cleanup) {
		dao.findCars(db, function (data) {
			res.json(data);
			cleanup();
		})
	});
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

router.get('/tracks', function (req, res) {
	dao.connect(function (db, cleanup) {
		dao.findTracks(db, function (tracks) {
			res.json(tracks);
			cleanup();
		});
	});
});
router.get('/findTrack/:name', function (req, res) {
	var name = req.params.name;
	dao.connect(function (db, cleanup) {
		dao.findTrack(db, name, function (data) {
			res.json(data);
			cleanup()
		})
	})
});
router.post('/addTrack', function (req, res) {
	var newTrack = req.body.track;
	dao.connect(function (db, cleanup) {
		dao.insertTrack(db, newTrack, function (data) {
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
router.post('/updateTrack', function (req, res) {
	var newTrack = req.body.track;
	dao.connect(function (db, cleanup) {
		dao.saveTrack(db, newTrack, function (data) {
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
router.post('/deleteTrack', function (req, res) {
	var trackToDelete = req.body.track;

	dao.connect(function (db, cleanup) {
		dao.deleteTrack(db, trackToDelete, function (data) {
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

router.post('/recordLap', function (req, res) {
	var newLap = {
		driver: req.body.driver,
		car: req.body.car,
		track: req.body.track,
		lapTime: req.body.lapTime
	};

	dao.connect(function (db, cleanup) {
		dao.insertLap(db, newLap, function (data) {
			res.json(data);
			cleanup();
		})
	});
});
router.get('/allLaps', function (req, res) {
	dao.connect(function (db, cleanup) {
		dao.allLaps(db, function (data) {
			res.json(data);
			cleanup();
		});
	});
});

router.get('/getSettings', function (req, res) {
	settings.connect(function (db, cleanup) {
		settings.getSettings(db, function (data) {
			res.json(data[0]);
			cleanup();
		});
	});
});
router.post('/saveSettings', function (req, res) {
	var newSettings = req.body.settings;
	settings.connect(function (db, cleanup) {
		settings.saveSettings(db, newSettings, function (data) {
			res.json(data);
			cleanup();
		});
	});
});

module.exports = router;
