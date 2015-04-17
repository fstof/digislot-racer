var debug = require('debug')('app:app');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var httpLogger = require('morgan');
var bodyParser = require('body-parser');

app.use(httpLogger('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));

var settings = require('./settings');
settings.load();

io.sockets.on('connection', require('./socket')); // Handle http socket connections
app.use('/api', require('./routes/api')); // Map API's

module.exports = http;
