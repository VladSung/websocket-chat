const { WebSocketServer } = require("ws");

var clients = new Set();
var socket = new WebSocketServer({ port: 8080 });
socket.on('connection', function connection(ws) {    
  clients.add(ws);
  ws.on('message', async function incoming(message) {
    clients.forEach(function(client) {
      client.send(message);
    });
  });
});

console.log('ws server running on port 8080')