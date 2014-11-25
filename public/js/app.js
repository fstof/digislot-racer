'use strict';

// Declare app level module which depends on filters, and services

angular.module('fs.digiSlot', [
	'ngRoute',
	'btford.socket-io',
	'ui.bootstrap'
])
	.config(function ($routeProvider) {
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/home.html',
				controller: 'HomeController'
			}).
			when('/newRace', {
				templateUrl: 'partials/newRace.html',
				controller: 'NewRaceController'
			}).
			when('/race', {
				templateUrl: 'partials/race.html',
				controller: 'RaceController'
			}).
			when('/driver', {
				templateUrl: 'partials/driver.html',
				controller: 'DriverController'
			}).
			when('/car', {
				templateUrl: 'partials/car.html',
				controller: 'CarController'
			}).
			otherwise({
				redirectTo: '/home'
			});
	})
	.filter('nincoTimeFormat', function () {

		return function (timeStr) {
			timeStr = timeStr.toString();

			var paddedTimeStr = timeStr.length >= 6 ? timeStr : new Array(6 - timeStr.length + 1).join('0') + timeStr;

			var hours = paddedTimeStr.substr(0, 2);
			var seconds = paddedTimeStr.substr(2, 2);
			var hundredths = paddedTimeStr.substr(4, 2);

			return hours + ':' + seconds + ':' + hundredths;
		}
	});
