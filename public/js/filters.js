'use strict';

/* Filters */

angular.module('fs.digiSlot').
	filter('interpolate', function (version) {
		return function (text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		}
	});
