
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var DIST_DIR = path.join(__dirname, "bin");
express = require('express');



//Setting the static file diretory so that the bundle files can be accessed inside html files. (Other wise 404 error)
app.use(express.static(DIST_DIR));

//importing things file 
var things = require('./routes/things.js');

var login = require('./routes/login.js'); 
var registration = require('./routes/registration.js');
var home = require('./routes/home.js'); 

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('new message', function(msg){
	console.log('Server recieved new message: '+msg);
    io.emit('new message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});




//Redirecting user to serve routes, which are present in "things.js" file (like /things/car, .
app.use('/things', things);
app.use('/', login);
app.use('/registration', registration); 
app.use('/home', home); 


//Now we are using the routes present in external js file (things.js)

http.listen(8080, function(){
  console.log("listening on port 8080");
});
