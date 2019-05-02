const http = require('http');
const fs = require('fs');


const server =http.createServer('/', function(req, res){
  fs.readFile('./index.html', 'utf-8', function(error, content) {
    res.writeHead(200,{"content-type" :"text/html"});
    res.end(content);
  });
});

//Chargement de socket.io
const io = require('socket.io')(server);

io.sockets.on( 'connection', (socket, pseudo) => {

  socket.on('pseudo', (pseudo) => {
    socket.pseudo=pseudo;
    socket.broadcast.emit('new_user',pseudo +' a rejoint le chat');
  });


  socket.on('message', (message) => {
    console.log(message);
   const new_message=message;
    socket.broadcast.emit('new_message', new_message)
   // console.log(messagec);
  });




 })
server.listen(8888);
