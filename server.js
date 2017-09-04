var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var DIST_DIR = path.join(__dirname, "bin");
var assert = require('assert');



var cookieParser = require('cookie-parser');
var handshakeData ={};	
var cookie = require('cookie');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/WebChat";


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
	
//This object also common for every user. Only "socket." variables are unique for different session users. 	
var activeUsers={};

  
  
//Setting the static file diretory so that the bundle files can be accessed inside html files. (Other wise 404 error)

app.use(express.static(DIST_DIR));

//importing things file 
var things = require('./routes/things.js');

var login = require('./routes/login.js'); 
var registration = require('./routes/registration.js');
var home = require('./routes/home.js');
var friends = require('./routes/friends.js');
var chat = require('./routes/chat.js'); 



/* *****This should work but it's not working so look for error in future********************
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
	
	//These two variables different for different user sessions.
	socket.activeUserID = newuser.userid;
	socket.activeUserName = newuser.username;
	
	//Key value store of use id and socked id
	activeUsers[socket.activeUserID] = socket;
	console.log("All Active users now are: ",Object.keys(activeUsers));
  });
  
  socket.on('new message', function(data){
	console.log('Server recieved new message: '+data.message);
	
	//Check whether the user was blocked by receiver before saving to database
	
	//Savinng message to database collection.
	 
	   MongoClient.connect(url, function(err, db) {
           if (err) throw err;
           var myobj = { senderId: socket.activeUserID, receiverId: data.receiver, message: data.message, status: 1, visibleTo: 2, time: Date.now() };
           db.collection("Messages").insertOne(myobj, function(err, res) {
             if (err) throw err;
			 
             db.close();
			 console.log("New message saved into database");
			 
            });
        });
		
	//******Here we are creating document for each message..but it's not a good paractice. So try to follow one of the following
			 //Create meessages object for each senderId-receiverId pair and then add messages to each pair.
             //or create receivers object for each sender and then add message object to each reciever object.	******//		 
	
	
	//Sending message to a particular receiver
	/*
	activeUsers[data.receiver].emit('new message',{msg: data.message, sender:socket.activeUserName});
	console.log("message receiver is: "+ data.receiver);
	*/
	
	//Sending message to to own sender
    socket.emit('new message',{msg: data.message, sender:"Me"});
	
  });
  
  //These methods common for every user.
  socket.on('disconnect', function(){
    console.log('user disconnected: '+ socket.activeUserID);
	if(!socket.activeUserID) return;
	delete activeUsers[socket.activeUserID];
	console.log("All Active users now are: ",Object.keys(activeUsers));
  });
});




//Redirecting user to serve routes, which are present in "things.js" file (like /things/car, .
app.use('/things', things);
app.use('/', login);
app.use('/registration', registration); 
app.use('/home', home);
app.use('/friends', friends); 
app.use('/chat', chat); 

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
