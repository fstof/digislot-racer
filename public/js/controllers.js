'use strict';

/* Controllers */

angular.module('fs.digiSlot')
	.controller('AppCtrl', function ($scope, digi) {
		$scope.digi = digi;
	})

	.controller('HomeController', function ($scope, $location, DataService, digi) {
		$scope.digi = digi;

		$scope.loadDrivers = function () {
			var driversPromise = DataService.getDrivers();
			driversPromise.then(function (res) {
				console.log('then ' + res);
				$scope.digi.lookups.drivers = res.data;
			});
			driversPromise.catch(function (res) {
				console.log('catch ' + res);
			});
			driversPromise.finally(function () {
				console.log('finally ');
			});
		};
		$scope.editDriver = function (driver) {
			$scope.digi.driver = driver;
			$location.path('driver');
		};
		$scope.deleteDriver = function (driver) {
			var deletePromise = DataService.deleteDriver(driver);
			deletePromise.then(function (res) {
				console.log('driver deleted: ' + res.success);
				$scope.loadDrivers();
			});
		};

		$scope.loadCars = function () {
			var carsPromise = DataService.getCars();
			carsPromise.then(function (res) {
				console.log('then ' + res);
				$scope.digi.lookups.cars = res.data;
			});
			carsPromise.catch(function (data) {
				console.log('catch ' + data);
			});
			carsPromise.finally(function () {
				console.log('finally ');
			});
		};
		$scope.deleteCar = function (car) {
			var deletePromise = DataService.deleteCar(car);
			deletePromise.then(function (res) {
				console.log('car deleted: ' + res.success);
				$scope.loadCars();
			});
		};
		$scope.editCar = function (car) {
			$scope.digi.car = car;
			$location.path('car');
		};

		$scope.loadTracks = function () {
			var tracksPromise = DataService.getTracks();
			tracksPromise.then(function (res) {
				console.log('then ' + res);
				$scope.digi.lookups.tracks = res.data;
			});
			tracksPromise.catch(function (data) {
				console.log('catch ' + data);
			});
			tracksPromise.finally(function () {
				console.log('finally ');
			});
		};
		$scope.deleteTrack = function (track) {
			var deletePromise = DataService.deleteTrack(track);
			deletePromise.then(function (res) {
				console.log('track deleted: ' + res.success);
				$scope.loadTracks();
			});
		};
		$scope.editTrack = function (track) {
			$scope.digi.track = track;
			$location.path('track');
		};

		if (!$scope.digi.lookups.cars) {
			$scope.loadCars();
		}
		if (!$scope.digi.lookups.drivers) {
			$scope.loadDrivers();
		}
		if (!$scope.digi.lookups.tracks) {
			$scope.loadTracks();
		}
	})

	.controller('DriverController', function ($scope, $location, DataService) {
		if ($scope.digi.driver == null) {
			$scope.digi.driver = {};
		}
		$scope.back = function () {
			$scope.digi.driver = null;
			$location.path('home');
		};
		$scope.save = function () {
			var savePromise;
			if ($scope.digi.driver._id) {
				savePromise = DataService.saveDriver($scope.digi.driver);
			} else {
				savePromise = DataService.addDriver($scope.digi.driver);
			}
			savePromise.then(function (res) {
				if (res.data.success) {
					$scope.digi.driver = null;
					$scope.digi.lookups.drivers = null;
					$location.path('home');
				}
			});
		}
	})

	.controller('CarController', function ($scope, $location, DataService) {
		if ($scope.digi.car == null) {
			$scope.digi.car = {};
		}
		$scope.back = function () {
			$scope.digi.car = null;
			$location.path('home');
		};
		$scope.save = function () {
			var savePromise;
			if ($scope.digi.car._id) {
				savePromise = DataService.saveCar($scope.digi.car);

			} else {
				savePromise = DataService.addCar($scope.digi.car);
			}
			savePromise.then(function (res) {
				if (res.data.success) {
					$scope.digi.car = null;
					$scope.digi.lookups.cars = null;
					$location.path('home');
				}
			});
		}
	})

	.controller('TrackController', function ($scope, $location, DataService) {
		if ($scope.digi.track == null) {
			$scope.digi.track = {};
		}
		$scope.back = function () {
			$scope.digi.track = null;
			$location.path('home');
		};
		$scope.save = function () {
			var savePromise;
			if ($scope.digi.track._id) {
				savePromise = DataService.saveTrack($scope.digi.track);
			} else {
				savePromise = DataService.addTrack($scope.digi.track);
			}
			savePromise.then(function (res) {
				if (res.data.success) {
					$scope.digi.track = null;
					$scope.digi.lookups.tracks = null;
					$location.path('home');
				}
			});
		}
	})

	.controller('LapsController', function ($scope, DataService) {
		DataService.getAllLaps().then(function (res) {
			$scope.laps = res.data;
		})
	})

	.controller('SettingsController', function ($scope, $location, DataService) {
		DataService.getSettings().then(function (res) {
			$scope.settings = res.data;
		});
		$scope.back = function () {
			$location.path('home');
		};
		$scope.save = function () {
			DataService.saveSettings($scope.settings).then(function (res) {
				$location.path('home');
			});
		}
	})

	.controller('NewRaceController', function ($scope, $location, digi, DataService, socket) {
		$scope.digi = digi;

		//if (!$scope.digi.lookups.cars) {
		//	$scope.loadCars();
		//}
		//if (!$scope.digi.lookups.drivers) {
		//	$scope.loadDrivers();
		//}
		//if (!$scope.digi.lookups.tracks) {
		//	$scope.loadTracks();
		//}
		$scope.cleanOldData = function () {
			for (var k = 0; k < $scope.digi.race.racers.length; k++) {
				$scope.digi.race.racers[k].position = 0;
				$scope.digi.race.racers[k].lap = 0;
				$scope.digi.race.racers[k].time = 0;
				$scope.digi.race.racers[k].lastLap = '0';
				$scope.digi.race.racers[k].bestLap = '0';
				$scope.digi.race.racers[k].fuel = 99;
				$scope.digi.race.racers[k].laps = [];
			}
		};
		$scope.cleanOldData();

		$scope.addRacer = function () {
			$scope.digi.race.racers.push({
				position: 0,
				lane: 0,
				lap: 0,
				time: 0,
				lastLap: '0',
				bestLap: '0',
				fuel: 99,
				laps: []
			});
		};
		$scope.removeRacer = function (racer) {
			var index = $scope.digi.race.racers.indexOf(racer);
			$scope.digi.race.racers.splice(index, 1);
		};

		socket.on('base:program', function (data) {
			console.log('base:program');
			$scope.digi.baseReady = true;
		});
		socket.on('base:mode', function (data) {
			console.log('base:mode');
			if ($scope.digi.baseReady) {
				$scope.digi.race.lights = data.lights;
				$scope.digi.race.mode = data.mode;
			}
		});
		//socket.on('base:line', function (data) {
		//	console.log('base:line');
		//	if ($scope.digi.baseReady) {
		//		$scope.digi.race.laps = data.laps;
		//		$scope.digi.race.racers = [];
		//		for (var k = 0; k < data.cars.length; k++) {
		//			$scope.digi.race.racers.push({
		//				position: 0,
		//				carNumber: data.cars[k].carNumber,
		//				lap: 0,
		//				time: 0,
		//				lastLap: '0',
		//				bestLap: '0',
		//				fuel: 99,
		//				laps: []
		//			});
		//		}
		//	}
		//});
		socket.on('base:raw', function (data) {
			console.log("raw data: " + data);
		});
		socket.on('base:err', function (data) {
			console.log("ERROR: " + data);
		});

		$scope.next = function () {
			$location.path('race');
		};

		$scope.$on("$destroy", function () {
			socket.removeAllListeners();
		});
	})

	.controller('RaceController', function ($scope, $timeout, socket, digi, DataService) {
		$scope.digi = digi;
		$scope.startLapCount = false;
		var timerPromise;
		var startTime;

		var timetime = function () {
			$scope.digi.race.totalTime = (new Date().getTime() - startTime) / 1000;
			timerPromise = $timeout(timetime, 10);
		};

		$scope.start = function () {
			$scope.digi.race.running = true;
			if (!startTime) {
				startTime = new Date().getTime();
			}
			timetime();
		};
		$scope.pause = function () {
			$scope.digi.race.running = false;
			startTime = null;
			$timeout.cancel(timerPromise);
		};
		socket.on('base:line', function (data) {
			console.log('base:line');
			if ($scope.digi.baseReady) {
				if ($scope.startLapCount) {
					$scope.digi.race.currentLap = Math.abs($scope.digi.race.laps - data.laps);
					for (var k = 0; k < $scope.digi.race.racers.length; k++) {
						var racer = $scope.digi.race.racers[k];
						for (var i = 0; i < data.cars.length; i++) {
							var car = data.cars[i];
							if (racer.carNumber == car.carNumber) {
								racer.position = car.position;
								break;
							}
						}
					}
				} else {
					$scope.digi.race.laps = data.laps;
					$scope.digi.race.currentLap = 0;
				}
			}
		});
		socket.on('base:result', function (data) {
			console.log('base:result');
			if ($scope.digi.baseReady) {
				if (!$scope.startLapCount) {
					$scope.startLapCount = true;
				}
				var racer = null;
				for (var k = 0; k < $scope.digi.race.racers.length; k++) {
					racer = $scope.digi.race.racers[k];
					if (racer.carNumber == data.carNumber) {
						break;
					}
					racer = null;
				}

				racer.lap = Math.abs($scope.digi.race.laps - data.lap);
				racer.lastLap = data.time - racer.time;
				racer.time = data.time;
				racer.bestLap = data.bestLap;
				racer.laps.push(racer.lastLap);

				if (racer.bestLap < $scope.digi.race.bestLap || $scope.digi.race.bestLap == 0) {
					$scope.digi.race.bestLap = racer.bestLap;
				}

				DataService.recordLap(racer.driver, racer.car, $scope.digi.race.track, racer.lastLap);
			}
		});
		socket.on('base:fuel', function (data) {
			console.log('base:fuel');
			if ($scope.digi.baseReady) {
				for (var k = 0; k < $scope.digi.race.racers.length; k++) {
					var racer = $scope.digi.race.racers[k];
					var car = data.cars[racer.carNumber - 1];
					racer.fuel = car.fuel;
				}
			}
		});

		socket.on('base:raw', function (data) {
			console.log("raw data: " + data);
		});
		socket.on('base:err', function (data) {
			console.log("ERROR: " + data);
		});
		$scope.$on("$destroy", function () {
			socket.removeAllListeners();
		});
	});
