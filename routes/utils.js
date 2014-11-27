var util = {};

util.padStr = function (string, len, filler) {
	string = string.toString();
	filler = filler || '0';
	return string.length >= len ? string : new Array(len - string.length + 1).join(filler) + string;
};

module.exports = util;