const express = require('express'),
      app     = express(),
      server  = require('http').Server(app),
      io      = require('socket.io')(server),
      port    = 6677;

app.use(express.static('client'));

app.get('/', function(req,res) {
  res.status(200).send('Hola mundo');
});

var messages = [{
  id: 1,
  text: 'Bienvenido al chat privado de Socket.io y NodeJS',
  nickname: 'Bot'
}];

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado - ip: '+ socket.handshake.address);

  socket.emit('messages', messages);

  socket.on('add-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

server.listen(port, function() {
  console.log('Servidor iniciado en http://localhost:6677');
});
