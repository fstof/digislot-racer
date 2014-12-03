'use strict';

/* Filters */

angular.module('fs.digiSlot')
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
