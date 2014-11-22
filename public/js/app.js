'use strict';

// Declare app level module which depends on filters, and services

angular.module('fs.digiSlot', [
	'ngRoute',
	'btford.socket-io',
	'ui.bootstrap'
]).
	config(function ($routeProvider) {
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
			when('/racer', {
				templateUrl: 'partials/racer.html',
				controller: 'RacerController'
			}).
			when('/car', {
				templateUrl: 'partials/car.html',
				controller: 'CarController'
			}).
			otherwise({
				redirectTo: '/home'
			});
	});
