'use strict';

angular.module('fs.digiSlot')
	.factory('digi', function () {
		return {
			race: {
				laps: 20,
				currentLap: 5,
				maxFuel: 100,
				racers: []
			}
		};
	});
