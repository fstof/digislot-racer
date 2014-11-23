'use strict';

/* Controllers */

angular.module('fs.digiSlot')
	.controller('AppCtrl', function ($scope, digi) {
		$scope.digi = digi;
	})

	.controller('HomeController', function ($scope, $location, socket, DataService, digi) {
		$scope.digi = digi;

		$scope.loadRacers = function () {
			var racersPromise = DataService.getRacers();
			racersPromise.then(function (res) {
				console.log('then ' + res);
				$scope.racers = res.data;
			});
			racersPromise.catch(function (res) {
				console.log('catch ' + res);
			});
			racersPromise.finally(function () {
				console.log('finally ');
			});
		};

		$scope.editRacer = function (racer) {
			$scope.digi.racer = racer;
			$location.path('racer');
		};

		$scope.deleteRacer = function (racer) {
			var deletePromise = DataService.deleteRacer(racer);
			deletePromise.then(function (res) {
				console.log('racer deleted: ' + res.success);
				$scope.loadRacers();
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
		$scope.loadRacers();
	})

	.controller('RacerController', function ($scope, $location, DataService) {
		if ($scope.digi.racer == null) {
			$scope.digi.racer = {};
		}
		$scope.back = function () {
			$scope.digi.racer = null;
			$location.path('home');
		};
		$scope.save = function () {
			var savePromise;
			if ($scope.digi.racer._id) {
				savePromise = DataService.saveRacer($scope.digi.racer);
			} else {
				savePromise = DataService.addRacer($scope.digi.racer);
			}
			savePromise.then(function (res) {
				if (res.data.success) {
					$scope.digi.racer = null;
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

		$scope.loadRacers = function () {
			var racersPromise = DataService.getRacers();
			racersPromise.then(function (res) {
				console.log('then ' + res);
				$scope.racers = res.data;
			});
		};
		$scope.loadCars = function () {
			var carsPromise = DataService.getCars();
			carsPromise.then(function (res) {
				console.log('then ' + res);
				$scope.cars = res.data;
			});
		};
		$scope.addRacer = function () {
			$scope.digi.race.racers.push({});
		};


		$scope.next = function () {
			for (var r = 0; r < $scope.digi.race.racers.length; r++) {
				$scope.digi.race.racers[r].pos = 0;
				$scope.digi.race.racers[r].lane = 0;
				$scope.digi.race.racers[r].lap = 0;
				$scope.digi.race.racers[r].fuel = 0;
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
