'use strict';

angular.module('fs.digiSlot')
	.factory('digi', function (socketFactory) {
		return {
			race: {
				laps: 20,
				currentLap: 5,
				maxFuel: 100,
				racers: [
					{_id: '5467c66c8c59540de89b730a', name: 'F. Stofberg', pos: 1, lane: 5, lap: 5, fuel: 34},
					{_id: '5467c6cc8c59540de89b730b', name: 'I. Stofberg', pos: 2, lane: 1, lap: 6, fuel: 54}
				]
			}
		};
	});
