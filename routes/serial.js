var settings = require('./settings');
// Initialize serial port
var serialPort = require("serialport");
var SerialPort = serialPort.SerialPort;

var sp = {
	lineIdentifiers: ['M', 'P', 'L', 'F', 'D'],
	port: function () {
		console.log('Creating SerialPort');
		var port = new SerialPort(settings.serialPort, {
			baudRate: 1200,
			dataBits: 7,
			stopBits: 1,
			parity: 'none',
			parser: serialPort.parsers.readline('\x0d')
			//parser: serialPort.parsers.raw
		}, false);

		port.on("open", function () {
			console.log('SerialPort opened');
		});
		port.on("close", function () {
			console.log('SerialPort closed');
		});
		return port;
	}
};

module.exports = sp;
