var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log('Connected: ' + new Date());

	// received video stream
	socket.on('video_stream', function (stream) {
		console.log('Stream: ' + stream);
		io.emit('video_stream', stream);
	});

	// received message
	socket.on('chat_message', function (stream) {
		console.log('Message: ' + stream);
		io.emit('chat_message', stream);
	});

	// a user disconnected
	socket.on('disconnect', function () {
		console.log('Disconnected: ' + new Date());
	});
});

http.listen(port, function () {
	console.log('Listening on ' + port + ' port.');
});