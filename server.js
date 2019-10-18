var axios = require('axios');
var express = require('express');
var app = express();
var http = require('http')
const router = express.Router()
// console.log(app)
// console.log(http)

router.get('/', function(req, res){
  res.send({response: "Hello"}).status(200);
});

let server = http.createServer(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 8000;

// const getApiAndEmit = async socket => {
//   try {
//     const response = await axios.get("http://localhost:3000/users")
//     socket.emit("chatMessage", response.data); // Emitting a new message. It will be consumed by the client
    
//   } catch (error) {
//     console.error(`Error: ${error.code}`);
//   }
// };

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    // socket.on('chatMessage', function(msg){
    //   console.log('message: ' + msg);
    //   socket.broadcast.emit('message', "this is a test")
    // });
    socket.on('sendMessage', (message) => {
      console.log('Send message -- server side', message);
      io.emit('receiveMessage', chatMessage(message.user_id, message.text, message.chat_id));
      });
});

server.listen(port, function(){
  console.log('listening on', port);
});

const chatMessage = (from, text, chat) => {
  return {
      from,
      text,
      chat,
      time: new Date().getTime()
 };
};


