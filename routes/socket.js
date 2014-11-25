/*
 * Serve content over a socket
 */
var sp = require('./serial');
var util = require('./base-util');

var socketConnect = function (socket) {
	console.log('a user connected, socket: ' + socket.id);

	var serialPort = sp.port();

	serialPort.open(function (error) {
		if ( error ) {
			console.log('failed to open serial port: ' + error);
			socket.emit('base:err', 'failed to open serial port: ' + error);
		} else {
			console.log('open');

			serialPort.on('data', function (data) {
				if (serialPort.lineIdentifiers.indexOf(data.charAt(0)) == -1) {
					data = data.substr(1);
				}
				var packet = util.toPacket(data);

				console.log('emitting received data: ' + data);
				socket.emit('base:raw', data);
				socket.emit('base:' + packet.type , packet);
			});
		}
	});

	socket.on('disconnect', function () {
		console.log('user disconnected');
	});


};

module.exports = socketConnect;
