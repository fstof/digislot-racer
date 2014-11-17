'use strict';

/* Directives */

angular.module('fs.digiSlot').
	directive('appVersion', function (version) {
		return function (scope, elm, attrs) {
			elm.text(version);
		};
	});
