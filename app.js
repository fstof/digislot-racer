var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/digislotRacer';
var monk = require('monk');
var db = monk('localhost:27017/digislotRacer');
//var Engine = require('tingodb')();
//var db = new Engine.Db('./data', {});
var assert = require('assert');

var theDB;

MongoClient.connect(url, function (err, db) {
	console.log('err ' + err);
	console.log("Connected correctly to server");
	theDB = db;

	insertDocuments(db, function () {
		updateDocument(db, function () {
			removeDocument(db, function() {
				findDocuments(db, function() {
					db.close();
				});
			});
		});
	});
});
var insertDocuments = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('koos');
	// Insert some documents
	collection.insert([
		{a: 1, b: 2}, {a: 2, b: 3}, {a: 3, b: 4}
	], function (err, result) {
		assert.equal(err, null);
		assert.equal(3, result.length);
		console.log("Inserted 3 documents into the document collection");
		callback(result);
	});
};
var updateDocument = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('koos');
	// Insert some documents
	collection.update({a: 2}
		, {$set: {b: 1}}, function (err, result) {
			console.log('updated ' + result + ' records');
			assert.equal(err, null);
			assert.equal(1, result);
			console.log("Updated the document with the field a equal to 2");
			callback(result);
		});
};
var removeDocument = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('koos');
	// Insert some documents
	collection.remove({ a : 3 }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result);
		console.log("Removed the document with the field a equal to 3");
		callback(result);
	});
};
var findDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('koos');
	// Find some documents
	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		assert.equal(2, docs.length);
		console.log("Found the following records");
		console.dir(docs)
		callback(docs);
	});
}


//var routes = require('./routes/index');
//var users = require('./routes/users');
var api = require('./routes/api');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));

// Make our db accessible to our router
app.use(function (req, res, next) {
	req.db = db;
	next();
});

//app.use('/', routes);
//app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = http;
//module.exports = app;
