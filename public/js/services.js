'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('fs.digiSlot')
	.factory('socket', function (socketFactory) {
		return socketFactory();
	})

	.service('DataService', function ($http) {
		this.getCars = function () {
			var promise = $http.get('/api/cars', {});
			return promise;
		};

		this.getRacers = function () {
			var promise = $http.get('/api/racers', {});
			return promise;
		};

		this.addCar = function (car) {
			var promise = $http.post('/api/addCar', {car: car});
			return promise;
		};

		this.saveCar = function (car) {
			var promise = $http.post('/api/updateCar', {car: car});
			return promise;
		};

		this.addRacer = function (racer) {
			var promise = $http.post('/api/addRacer', {racer: racer});
			return promise;
		};

		this.saveRacer = function (racer) {
			var promise = $http.post('/api/updateRacer', {racer: racer});
			return promise;
		};

		this.deleteCar = function (car) {
			return $http.post('/api/deleteCar', {car: car});
		};

		this.deleteRacer = function (racer) {
			return $http.post('/api/deleteRacer', {racer: racer});
		};

	});
