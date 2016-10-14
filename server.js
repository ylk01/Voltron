var app = require('express')(); //Express initializes app to be a func handler
var http = require('http').Server(app); //route handler
var io = require('socket.io').listen(http); //include socketio
var usernames = [];//create array to hold usernames

app.get('/', function(request, response){   //create a rout through Express
  response.sendFile(__dirname + '/client.html');  //the client gets it whenever the page is loaded
});


io.on('connection', function(socket){
  socket.on('new user connected', function(data, callback){   //check whether there is a user with this name in the array
   if (usernames.indexOf(data) == -1){
     callback(true);
     socket.username = data;
     usernames.push(socket.username);
    updateUsr();

    } else {
      callback(false); //if not in the array add it to the socket and push to the array
    }
  });

function updateUsr() {
  io.emit('usernames', usernames);
}
 socket.on('chat message', function(msg){
    io.emit('chat message', {line: msg, usr:socket.username});
  });

socket.on('disconnect', function(data){  //erase the name if user disconnects
  if(!socket.username) return;
  usernames.splice(usernames.indexOf(socket.username), 1);
  updateUsr();
});

});
http.listen(1337, function(){         //make server listen on 1337
  console.log('listening on *:1337');
});




























/* var http = require('http'), fs = require('fs'); //Read contents of client.html
var app = http.createServer(function (request, response) {   //creaeServer is amethod that is part of http module, allows to specify a call back function
  fs.readFile("client.html", 'utf-8', function (error, data) {  //file to be read, encoding, callback
        response.writeHead(200, {'Content-Type': 'text/html'}); //http header infor to be sent - html
        response.write(data); //send contents of html to user
        response.end(); //end-required
    });

}).listen(1337);     //calls listen to start it    //request object contains all info about the request, response sends answer

var io = require('socket.io').listen(app); //listen for the http server instance

io.sockets.on('connection', function(socket) { //event fired everytime a connection gets in
    socket.on('message_to_server', function(data) { //event handler called everytime conected client triggers event
        io.sockets.emit("message_to_client",{ message: data["message"] }); //triggers event fo all client sockets, sends message
    });
}); */


/*var http = require('http');

http.createServer(function (req, rese) {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*'
    });
    res.end('Hello World\n');
}).listen(1337); */

/*var app = require('http').createServer(handler), io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(1337);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
*/
