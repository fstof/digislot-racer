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
				$scope.drivers = res.data;
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
				$scope.cars = res.data;
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

		$scope.loadCars();
		$scope.loadDrivers();
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
					$location.path('home');
				}
			});
		}
	})

	.controller('NewRaceController', function ($scope, $location, digi, DataService, socket) {
		$scope.digi = digi;

		$scope.loadDrivers = function () {
			var driversPromise = DataService.getDrivers();
			driversPromise.then(function (res) {
				console.log('then ' + res);
				$scope.drivers = res.data;
			});
		};
		$scope.loadCars = function () {
			var carsPromise = DataService.getCars();
			carsPromise.then(function (res) {
				console.log('then ' + res);
				$scope.cars = res.data;
			});
		};
		$scope.loadCars();
		$scope.loadDrivers();

		$scope.addRacer = function () {
			$scope.digi.race.racers.push({pos: 0, lane: 0, lap: 0, lastLap: 0.0, bestLap: 0.0, fuel: 99});
		};
		$scope.removeRacer = function (racer) {
			var index = $scope.digi.race.racers.indexOf(racer);
			$scope.digi.race.racers.splice(index, 1);
		};

		$scope.digi.baseReady = false;

		socket.on('base:program', function (data) {
			$scope.digi.baseReady = true;
		});
		socket.on('base:mode', function (data) {
			if ($scope.digi.baseReady) {
				$scope.digi.race.lights = data.lights;
				$scope.digi.race.mode = data.mode;
			}
		});
		socket.on('base:line', function (data) {
			if ($scope.digi.baseReady) {
				$scope.digi.race.laps = data.laps;
				$scope.digi.race.racers = [];
				for (var k = 0; k < data.cars.length; k++) {
					$scope.digi.race.racers.push({
						pos: 0,
						carNumber: data.cars[k].carNo,
						lap: 0,
						lastLap: 0.0,
						bestLap: 0.0,
						fuel: 99
					});
				}
			}
		});
		socket.on('base:raw', function (data) {
			console.log("raw data: " + data);
		});

		$scope.next = function () {
			$location.path('race');
		};

		$scope.$on("$destroy", function(){
			socket.disconnect();
		});
	})

	.controller('RaceController', function ($scope, $timeout, socket, digi) {
		$scope.digi = digi;
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

		socket.on('base:fuel', function (data) {
			if ($scope.digi.baseReady) {
				for (var k = 0; k < $scope.digi.race.racers.length; k++) {
					var racer = $scope.digi.race.racers[k];
					var car = data.cars[racer.carNumber - 1];
					racer.fuel = car.fuel;
				}
			}
		});
	});
