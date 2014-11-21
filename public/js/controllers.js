'use strict';

/* Controllers */

angular.module('fs.digiSlot')
	.controller('AppCtrl', function ($scope, digi) {
		$scope.digi = digi;
	})

	.controller('HomeController', function ($scope, socket, DataService, digi) {
		$scope.digi = digi;

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
	})

	.controller('NewRaceController', function ($scope, digi) {
		$scope.digi = digi;
	})

	.controller('RacerController', function ($scope, $location, DataService) {
		$scope.racer = {};
		$scope.save = function () {
			var savePromise = DataService.saveRacer($scope.racer);
			savePromise.then(function (res) {
				if (res.data[0].success) {
					$location.path("home");
				}
			});
		}
	})

	.controller('CarController', function ($scope, $location, DataService) {
		$scope.car = {};
		$scope.save = function () {
			var savePromise = DataService.saveCar($scope.car);
			savePromise.then(function (res) {
				if (res.data[0].success) {
					$location.path("home");
				}
			});
		}
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
