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
		racersPromise.catch(function (data) {
			console.log('catch ' + data);
		});
		racersPromise.finally(function () {
			console.log('finally ');
		});
	})

	.controller('NewRaceController', function ($scope, digi) {
		$scope.digi = digi;
	})

	.controller('RacerController', function ($scope) {
		$scope.racer = {};
	})

	.controller('CarController', function ($scope) {
		$scope.car = {};
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
