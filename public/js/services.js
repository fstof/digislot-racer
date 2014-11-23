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

		this.getDrivers = function () {
			var promise = $http.get('/api/drivers', {});
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

		this.addDriver = function (driver) {
			var promise = $http.post('/api/addDriver', {driver: driver});
			return promise;
		};

		this.saveDriver = function (driver) {
			var promise = $http.post('/api/updateDriver', {driver: driver});
			return promise;
		};

		this.deleteCar = function (car) {
			return $http.post('/api/deleteCar', {car: car});
		};

		this.deleteDriver = function (driver) {
			return $http.post('/api/deleteDriver', {driver: driver});
		};

	});
