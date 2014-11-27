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
			return $http.get('/api/cars', {});
		};
		this.addCar = function (car) {
			return $http.post('/api/addCar', {car: car});
		};
		this.saveCar = function (car) {
			return $http.post('/api/updateCar', {car: car});
		};
		this.deleteCar = function (car) {
			return $http.post('/api/deleteCar', {car: car});
		};

		this.getDrivers = function () {
			return $http.get('/api/drivers', {});
		};
		this.addDriver = function (driver) {
			return $http.post('/api/addDriver', {driver: driver});
		};
		this.saveDriver = function (driver) {
			return $http.post('/api/updateDriver', {driver: driver});
		};
		this.deleteDriver = function (driver) {
			return $http.post('/api/deleteDriver', {driver: driver});
		};

		this.getTracks = function () {
			return $http.get('/api/tracks', {});
		};
		this.addTrack = function (track) {
			return $http.post('/api/addTrack', {track: track});
		};
		this.saveTrack = function (track) {
			return $http.post('/api/updateTrack', {track: track});
		};
		this.deleteTrack = function (track) {
			return $http.post('/api/deleteTrack', {track: track});
		};
	});
