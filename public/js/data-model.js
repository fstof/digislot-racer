'use strict';

angular.module('fs.digiSlot')
	.factory('digi', function () {
		return {
			race: {
				running: false,
				laps: 20,
				lights: false,
				mode: 'amateur',  //amateur / professional
				currentLap: 0,
				totalTime: 0.0,
				bestLap: 0.0,
				maxFuel: 100,
				racers: []
			}
		};
	});
