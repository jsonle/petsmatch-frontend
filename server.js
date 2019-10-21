var axios = require('axios');
var express = require('express');
var app = express();
var http = require('http')
const router = express.Router()

router.get('/', function(req, res){
  res.send({response: "Hello"}).status(200);
});

let server = http.createServer(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 8000;

io.on('connection', function(socket){
    socket.on('disconnect', function(){
    });
    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', chatMessage(message.user_id, message.text, message.chat_id));
      });
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


