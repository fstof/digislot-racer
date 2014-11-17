/*
 * Serve content over a socket
 */

var socketConnect = function (socket) {
	console.log('a user connected, socket: ' + socket.id);

	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	socket.emit('send:name', {
		name: 'Bob'
	});
	setInterval(function () {
		socket.emit('send:time', {
			time: (new Date()).toString()
		});
	}, 1000);

	socket.on('chat message', function (msg) {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
		socket.emit('chat message', 'echo: ' + msg);
		socket.broadcast.emit('chat message', 'bc: ' + msg);
	});
};

module.exports = socketConnect;
