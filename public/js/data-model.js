'use strict';

angular.module('fs.digiSlot')
	.factory('digi', function () {
		return {
			baseReady: false,
			race: {
				track: null,
				running: false,
				laps: 20,
				lights: false,
				mode: 'amateur',  //amateur / professional
				currentLap: 0,
				totalTime: '000000',
				bestLap: '000000',
				maxFuel: 100,
				racers: []
			}
		};
	});
