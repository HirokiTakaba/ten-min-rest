var socket = io.connect("http://localhost:3000/");

//var socket = new io.Socket();
socket.on('message', function(msg) {
    console.log(msg);
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(msg));
    document.body.appendChild(div);
});
//socket.connect();

function send() {
    var name = document.getElementById('name');
    if(name == '') { // TODO
        name = '匿名希望';
    }
    var message = document.getElementById('message');
    socket.send(name.value + ' : ' + message.value);
    message.value = '';
    return false;
}
