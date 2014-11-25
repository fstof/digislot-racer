var settings = require('./settings');
// Initialize serial port
var serialPort = require("serialport");
var SerialPort = serialPort.SerialPort;

var sp = {
	port: function () {
		console.log('creating serialport');
		var port = new SerialPort(settings.serialPort, {
			baudRate: 1200,
			dataBits: 7,
			stopBits: 1,
			parity: 'none',
			parser: serialPort.parsers.readline('\x0d')
			//parser: serialPort.parsers.raw
		}, false);
		return port;
	}
};



sp.lineIdentifiers = ['M', 'P', 'L', 'F', 'D'];

// port.on("open", function () {
// 	console.log('port opened');
// });

module.exports = sp;
