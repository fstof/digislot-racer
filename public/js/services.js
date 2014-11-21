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
		
		this.saveCar = function (car) {
			var promise = $http.post('/api/car', car);
			return promise;
		}

		this.saveRacer = function (racer) {
			var promise = $http.post('/api/racer', racer);
			return promise;
		}
	});
