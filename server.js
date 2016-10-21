var app = require('express')(); //Express initializes app to be a func handler
var http = require('http').Server(app); //route handler
var io = require('socket.io').listen(http); //include socketio
var usernames = [];//create array to hold usernames

app.get('/', function(request, response){   //create a rout through Express
  response.sendFile(__dirname + '/client.html');  //the client gets it whenever the page is loaded
});


io.on('connection', function(socket){
  socket.on('new user connected', function(data, callback){   //check whether there is a user with this name in the array
   if (usernames.indexOf(data) == -1){ //if the index of the current element is free process
     callback(true);
     socket.username = data;
     usernames.push(socket.username);
    updateUsr();

    } else {
      callback(false); //if not in the array add it to the socket and push to the array
    }
  });

module.exports = function updateUsr() {  //createfunc for display as otherwise it cannot be replicted
  io.emit('usernames', usernames);
}
 socket.on('chat message', function(msg){
    io.emit('chat message', {line: msg, usr:socket.username});
   return array[usernames];
  });

socket.on('disconnect', function(data){  //erase the name if user disconnects
  if(!socket.username) return;  //if the user didnt choose username
  usernames.splice(usernames.indexOf(socket.username), 1); //if he did removeit from the array
  updateUsr();
});

});
http.listen(1337, function(){         //make server listen on 1337 and check whether server is up on the console
  console.log('listening on *:1337');
});
