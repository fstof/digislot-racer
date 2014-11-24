// Initialize serial port
var serialPort = require("serialport");
var SerialPort = serialPort.SerialPort;

var port = new SerialPort("COM4", {
	baudRate: 1200,
	dataBits: 7,
	stopBits: 1,
	parity: 'none',
	parser: serialPort.parsers.readline('\x0d')
	//parser: serialPort.parsers.raw
});

port.lineIdentifiers = ['M', 'P', 'L', 'F', 'D'];

port.on("open", function () {
	console.log('port opened');
});
//
//port.on('data', function (data) {
//	if (port.lineIdentifiers.indexOf(data.charAt(0)) == -1) {
//		data = data.substr(1);
//	}
//	console.log('data received: ' + data);
//	io.emit('base:data', 'data received: ' + data);
//});


module.exports = port;
