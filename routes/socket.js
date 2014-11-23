/*
 * Serve content over a socket
 */
var serialPort = require('./serial');
var util = require('./base-util');

var socketConnect = function (socket) {
	console.log('a user connected, socket: ' + socket.id);
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	serialPort.on('data', function (data) {
		if (lineIdentifiers.indexOf(data.charAt(0)) == -1) {
			data = data.substr(1);
		}
		var packet = util.toPacket(data);

		console.log('emitting received data: ' + data);
		socket.emit('base:raw', data);
		socket.emit('base:' + packet.type , packet);
	});
};

module.exports = socketConnect;
