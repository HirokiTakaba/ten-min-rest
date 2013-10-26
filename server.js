var express = require('express');
var app = express.createServer();

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.register('.html', require('ejs'));
    app.set('view engine', 'ejs');
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});
app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

var counter = 1;
var socketio = require('socket.io');
var io = socketio.listen(app);
io.set("transports", ["xhr-polling"]);
io.set("polling duration", 10);
io.sockets.on('connection', function(socket_connection) {
    console.log('connected');
    console.log(counter);
    counter++;
    socket_connection.on('message', function(msg) {
        console.log("メッセージ受信");
        //socket_connection.send(msg);
        io.sockets.emit('message', msg);
    });
});

app.get('/', function(req, res) {
    res.render('clock.ejs', {
        layout: false,
    });
});
app.get('/clock', function(req, res) {
    res.render('clock.ejs', {
        layout: false,
    });
});
app.get('/chat', function(req, res) {
    res.render('chat.ejs', {
        layout: false,
        locals: { name: req.param('name') || 'anonymous' }
    });
});
