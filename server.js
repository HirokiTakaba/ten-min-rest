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

var io = require('socket.io');
var socket = io.listen(app);
socket.on('connection', function(client) {
    client.on('message', function(msg) {
        client.send(msg);
        client.broadcast(msg);
    });
})

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
