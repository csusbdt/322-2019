const net = require('net');

const socket = net.connect(80, 'csusb.edu');

socket.on('connect', onConnect);
socket.on('data'   , processResponse);

const httpRequestMessage = 
  "GET / HTTP/1.1"           + "\r\n" + 
  "Connection: close"        + "\r\n" +
  "Host: csusb.edu"          + "\r\n" +
  ""                         + "\r\n";

function onConnect() {
  socket.write(httpRequestMessage, 'ascii');
}

function processResponse(httpResponseMessage) {
  console.log(httpResponseMessage.toString());
}

