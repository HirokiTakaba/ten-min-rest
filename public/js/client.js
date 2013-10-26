var socket = new io.Socket();
socket.on('message', function(msg) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(msg));
    document.body.appendChild(div);
});
socket.connect();

function send() {
    var message = document.getElementById('message');
    socket.send(document.getElementById('name').innerText + ': ' + message.value);
    message.value = '';
    return false;
}
