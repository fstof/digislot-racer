/*
 * Serve content over a socket
 */
var sp = require('./serial');
var util = require('./base-util');

var socketConnect = function (socket) {
	console.log('Socket connected id = ' + socket.id);

	var serialPort = sp.port();

	serialPort.open(function (error) {
		if (error) {
			console.log('failed to open serial port: ' + error);
			socket.emit('base:err', 'failed to open serial port: ' + error);
		} else {
			serialPort.on('data', function (data) {
				if (sp.lineIdentifiers.indexOf(data.charAt(0)) == -1) {
					data = data.substr(1);
				}
				var packet = util.toPacket(data);

				console.log('emitting received data: ' + data);
				socket.emit('base:raw', data);
				socket.emit('base:' + packet.type, packet);
			});
		}
	});

	socket.on('disconnect', function () {
		console.log('Socket disconnected');
		try {
			serialPort.close();
		} catch (err) {
			console.log('could not close SerialPort: ' + err)
		}
	});


};

module.exports = socketConnect;
