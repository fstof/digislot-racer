'use strict';

// Declare app level module which depends on filters, and services

angular.module('fs.digiSlot', [
	'ngRoute',
	'btford.socket-io',
	'ui.bootstrap',
	'ui.utils'
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
			when('/track', {
				templateUrl: 'partials/track.html',
				controller: 'TrackController'
			}).
			when('/laps', {
				templateUrl: 'partials/laps.html',
				controller: 'LapsController'
			}).
			when('/settings', {
				templateUrl: 'partials/settings.html',
				controller: 'SettingsController'
			}).
			otherwise({
				redirectTo: '/home'
			});
	});
