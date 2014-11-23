'use strict';

/* Controllers */

angular.module('fs.digiSlot')
	.controller('AppCtrl', function ($scope, digi) {
		$scope.digi = digi;
	})

	.controller('HomeController', function ($scope, $location, socket, DataService, digi) {
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

	.controller('NewRaceController', function ($scope, $location, digi) {
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
		$scope.addDriver = function () {
			$scope.digi.race.drivers.push({});
		};


		$scope.next = function () {
			for (var r = 0; r < $scope.digi.race.drivers.length; r++) {
				$scope.digi.race.drivers[r].pos = 0;
				$scope.digi.race.drivers[r].lane = 0;
				$scope.digi.race.drivers[r].lap = 0;
				$scope.digi.race.drivers[r].fuel = 0;
			}
			$location.path('race');
		};
	})

	.controller('RaceController', function ($scope, socket, digi) {
		$scope.digi = digi;

		socket.on('base:reset', function (data) {
			$scope.name = data.name;
		});

		socket.on('base:lap', function (data) {
			$scope.time = data.time;
		});
	});
