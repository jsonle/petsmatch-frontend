var axios = require('axios');
var express = require('express');
var app = express();
var http = require('http')
const router = express.Router()

router.get('/', function(req, res){
  res.send({response: "Hello"}).status(200);
});

const port = process.env.PORT || 8000;
const server = express()
  .use(express.static(__dirname + '/build'), (req, res, next) => next())
  .get('*', function(req, res) {res.sendFile('index.html', {root: __dirname + '/build'})})
  .listen(port, () => console.log(`Listening on ${ port }`));

var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('leave',function(room){  
      try{
        console.log('[socket]','leave room :', room);
        socket.leave(room);
        socket.to(room).emit('user left', socket.id);
      }catch(e){
        console.log('[error]','leave room :', e);
        socket.emit('error','couldnt perform requested action');
      }
    })
    socket.on('room', function(room) {
      socket.join(room);
    });
    socket.on('sendMessage', (message) => {
      io.sockets.in(`chat_id_${message.chat_id}`).emit('receiveMessage', chatMessage(message.user_id, message.text, message.chat_id));
      });
    socket.on('disconnect', function(){});
});

server.listen(port, function(){
  console.log('listening on', port);
});

const chatMessage = (user_id, text, chat_id) => {
  return {
      user_id,
      text,
      chat_id,
      time: new Date().getTime()
 };
};


