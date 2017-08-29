var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var DIST_DIR = path.join(__dirname, "bin");



var cookieParser = require('cookie-parser');
var handshakeData ={};	
var cookie = require('cookie');


var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore(
      {
        uri: 'mongodb://localhost:27017/WebChat',
        collection: 'mySessions'
      });

    // Catch errors
   store.on('error', function(error) {
      assert.ifError(error);
      assert.ok(false);
    });
var activeUsers={};

  
  
//Setting the static file diretory so that the bundle files can be accessed inside html files. (Other wise 404 error)

app.use(express.static(DIST_DIR));

//importing things file 
var things = require('./routes/things.js');

var login = require('./routes/login.js'); 
var registration = require('./routes/registration.js');
var home = require('./routes/home.js');
var friends = require('./routes/friends.js'); 



/* *****This should word but it's not working so look for error in future********************
//Getting cookies from request header. so that from it we can get session id.

io.use(function(socket, next) {
	
  console.log("Server io called");
  handshakeData = socket.request;
  var cookies = cookie.parse(handshakeData.headers.cookie);
  
  // make sure the handshake data looks good as before
  // if error do this:
    // next(new Error('not authorized'));
  // else just call next
  
  
  //******Bringing sessionid and storing in a global variable
  console.log("***********************Server*********************");
  console.log("server io called");
  console.log("");
  console.log('All cookies parsed in io.use ( %s )', JSON.stringify(cookies));
  handshakeData.sessionID = cookies['connect.sid'].split('.')[0].split(':')[1];
  console.log('All cookies parsed at server ( %s )', JSON.stringify(cookies));
  console.log('Session id at server cookie value in io.use( %s )', JSON.stringify(handshakeData.sessionID));
  next();
});

*/
	



io.on('connection', function(socket){
	
  console.log('user connected');
  
  socket.on('new user', function(newuser){
	console.log('New user connected: '+ newuser.userid);
	socket.activeUserID = newuser.userid;
	socket.activeUserName = newuser.username;
	
	//Key value store of use id and socked id
	activeUsers[socket.activeUserID] = socket;
	console.log("All Active users now are: ",activeUsers);
  });
  
  socket.on('new message', function(data){
	console.log('Server recieved new message: '+data.message);
	
	//Sending message to a particular receiver
	activeUsers[data.receiver].emit('new message',{msg: data.message, sender:socket.activeUserName});
	console.log("message receiver is: "+ data.receiver);
	
	//Sending message to to own sender
    socket.emit('new message',{msg: data.message, sender:"Me"});
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
	if(!socket.activeUser) return;
	delete activeUsers[socket.userID];
	console.log("All Active users now are: ",activeUsers);
  });
});




//Redirecting user to serve routes, which are present in "things.js" file (like /things/car, .
app.use('/things', things);
app.use('/', login);
app.use('/registration', registration); 
app.use('/home', home);
app.use('/friends', friends); 

//Now we are using the routes present in external js files


//Instead of authorization/handshake ... we are using a middleware to access sesssion data. 
app.use(function(req, res, next) {
    
	  
	  if (req.session.username)
	  {
	   console.log("*********************Exicuted after every request*************");
	   console.log("session id at server: "+req.sessionID);
	   console.log("******************************************************************************************************************");
	   store.get(req.sessionID, function (err, session) {
		  
                // save the session data and accept the connection
                handshakeData.session = session;
				//console.log("************ "+ handshakeData.sessionID);
				
				//Now we can retrieve all session data
				console.log("Session  data after connection: " + handshakeData.session.username);
            
        }); 
		
	  }
	  
	  else
	  {
		  console.log("Session not started");
	  }
	  
	  
 });




http.listen(8080, function(){
  console.log("listening on port 8080");
});
