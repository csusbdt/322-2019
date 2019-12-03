const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9998 });
 
console.log("I only run at server start");
wss.on('connection', function(ws) {
  console.log("I run when page is loaded or refreshed");
  ws.on('message', function(message) {
    console.log("I run for every send operation from page (I should run twice)");
  });
  ws.send('bye 2');
  ws.send('bye 2');
});


var express = require('express');
var server  = express();
server.use('/', express.static(__dirname + '/'));
server.listen(9999);

