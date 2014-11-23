var modePacket =  {
	type: 'mode',
	lights: false,
	mode: 'amateur'
};
var programPacket =  {
	packet: 'program'
};
var finishLinePacket = {
	type: 'line',
	laps: 0,
	car1: {pos: 0, speed: 0},
	car2: {pos: 0, speed: 0},
	car3: {pos: 0, speed: 0},
	car4: {pos: 0, speed: 0},
	car5: {pos: 0, speed: 0},
	car6: {pos: 0, speed: 0},
	car7: {pos: 0, speed: 0},
	car8: {pos: 0, speed: 0}
};
var fuelPacket = {
	type: 'fuel',
	car1: 0,
	car2: 0,
	car3: 0,
	car4: 0,
	car5: 0,
	car6: 0,
	car7: 0,
	car8: 0
};
var resultPacket = {
	type: 'result',
	car: 0,
	laps: 0,
	time: 0,
	fastestLap: 0
};

var baseUtil = function () {
	this.toPacket = function (data) {
		if (data.charAt(0) == 'M') {		// Mode packet MX <CR> eg M2 <CR>
			return this.buildModePacket(data);
		} else if (data.charAt(0) == 'P') {	// Programming Package P <CR> eg P <CR>
			return programPacket;
		} else if (data.charAt(0) == 'L') {	// Finish line package LRRRR, A1, A2, A3, A4, A5, A6, A7, A8 <CR> eg L0025,0C, 0C, 2C, 4C, 0C, 3C, 0C, 1C <CR>
			return this.buildFinishLinePacket(data);
		} else if (data.charAt(0) == 'F') {	// Fuel level package FB1, B2, B3, B4, B5, B6, B7, B8 <CR> eg F99, I5,66,43,05,28,47,42 <CR>
			return this.buildFuelPacket(data);
		} else if (data.charAt(0) == 'D') {	// Result Package Daaaa, RRRR, GGGGGG, SSSSSS <CR> eg D0008,0004,000523,000213 <CR>
			return this.buildResultPacket(data);
		}
		console.log('Unknown Packet');
		return {};
	};

	this.buildModePacket = function (data) {
		var flags = Number(data.charAt(1)).toString(2);
		if (flags.charAt(0) == 1) {
			modePacket.lights = true;
		}
		if (flags.charAt(1) == 1) {
			modePacket.mode = 'professional';
		}
		return modePacket;
	};

	this.buildFinishLinePacket = function (data) {
		return finishLinePacket;
	};

	this.buildFuelPacket = function (data) {
		return fuelPacket;
	};

	this.buildResultPacket = function (data) {
		return resultPacket;
	};
};

module.exports = baseUtil;
