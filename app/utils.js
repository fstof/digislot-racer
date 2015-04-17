var debug = require('debug')('app:base-util');

var modePacket = {
	type: 'mode',
	lights: false,
	mode: 'amateur'
};
var programPacket = {
	type: 'program'
};
var finishLinePacket = {
	type: 'line',
	laps: 0,
	cars: []
};
var fuelPacket = {
	type: 'fuel',
	cars: []
};
var resultPacket = {
	type: 'result',
	carNumber: 0,
	lap: 0,
	time: 0,
	bestLap: 0
};

var utils = {
	toPacket: function (data) {
		if (data.charAt(0) == 'M') {		// Mode packet MX <CR> eg M2 <CR>
			return this.buildModePacket(data.substr(1));
		} else if (data.charAt(0) == 'P') {	// Programming Package P <CR> eg P <CR>
			return programPacket;
		} else if (data.charAt(0) == 'L') {	// Finish line package LRRRR, A1, A2, A3, A4, A5, A6, A7, A8 <CR> eg L0025,0C, 0C, 2C, 4C, 0C, 3C, 0C, 1C <CR>
			return this.buildFinishLinePacket(data.substr(1));
		} else if (data.charAt(0) == 'F') {	// Fuel level package FB1, B2, B3, B4, B5, B6, B7, B8 <CR> eg F99, I5,66,43,05,28,47,42 <CR>
			return this.buildFuelPacket(data.substr(1));
		} else if (data.charAt(0) == 'D') {	// Result Package Daaaa, RRRR, GGGGGG, SSSSSS <CR> eg D0008,0004,000523,000213 <CR>
			return this.buildResultPacket(data.substr(1));
		}
		debug('Unknown Packet');
		return {};
	},

	buildModePacket: function (data) {
		var flag = Number(data);
		if (flag == 0) {
			modePacket.mode = 'amateur';
			modePacket.lights = false;
		} else if (flag == 1) {
			modePacket.mode = 'amateur';
			modePacket.lights = true;
		} else if (flag == 2) {
			modePacket.mode = 'professional';
			modePacket.lights = false;
		} else {
			modePacket.mode = 'professional';
			modePacket.lights = true;
		}
		return modePacket;
	},

	buildFinishLinePacket: function (data) {
		var split = data.split(',');
		finishLinePacket.laps = Number(split[0]);
		finishLinePacket.cars = [];
		for (var k = 1; k < split.length; k++) {
			finishLinePacket.cars.push({
				carNumber: k,
				position: Number(split[k].charAt(0)),
				speed: split[k].charAt(1)
			});
		}
		return finishLinePacket;
	},

	buildFuelPacket: function (data) {
		var split = data.split(',');
		fuelPacket.cars = [];
		for (var k = 0; k < split.length; k++) {
			var level;
			if (isNaN(split[k])) {
				level = 0;
			} else {
				level = Number(split[k]);
			}
			fuelPacket.cars.push({
				carNumber: k + 1,
				fuel: level
			});
		}
		return fuelPacket;
	},

	buildResultPacket: function (data) {
		var split = data.split(',');
		resultPacket.carNumber = Number(split[0]);
		resultPacket.lap = Number(split[1]);
		resultPacket.time = split[2];
		resultPacket.bestLap = split[3];

		return resultPacket;
	},

	padStr: function (string, len, filler) {
		string = string.toString();
		filler = filler || '0';
		return string.length >= len ? string : new Array(len - string.length + 1).join(filler) + string;
	}
};

module.exports = utils;
