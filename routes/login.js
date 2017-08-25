var express = require('express');
var router = express.Router();
var path = require("path");
var SRC_DIR=path.join(__dirname, "../src/views");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var cookieParser = require('cookie-parser'); 
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var login_success = 0;

router.use(cookieParser('This is a secret'));

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
	
router.use(require('express-session')({
      secret: 'This is a secret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
      store: store,
      // Boilerplate options, see:
      // * https://www.npmjs.com/package/express-session#resave
      // * https://www.npmjs.com/package/express-session#saveuninitialized
      resave: true,
      saveUninitialized: true,
	  unset: 'destroy' 
    }));
	

router.get('/', function(req, res){
	  
	  
	  
	
	  console.log("Actual session id before login: "+ req.sessionID);   
	
	//Clearing cookies at client side.
	    res.clearCookie("login_message");
	    res.clearCookie("connect.sid");
	    res.clearCookie("io");
		res.clearCookie("user_name");
		res.clearCookie("user_id");
	    req.session = null;
	  console.log("Actual session id before login destroyed:"); 
		
		
	
	if (login_success == 2)
	  {
	     res.cookie('login_message', 'incorrectCredentials');
		 login_success = 0;
	  }
	  
	  res.sendFile(path.join(SRC_DIR,"login.html"));
     // res.sendFile(path.join(__dirname, '../bin', 'login.html'));
	  
});





router.post('/', urlencodedParser, function(req, res){
	
	
	console.log("database called");
	
	//Fetching form data
       var username = req.body.loginusername;  
       var password  = req.body.loginpassword;
	   
	   
	 //Connection string to datanbase
	   var MongoClient = require('mongodb').MongoClient;
       var url = "mongodb://localhost:27017/WebChat";

     //Comparing username and password.
	   MongoClient.connect(url, function(err, db) {
           if (err) throw err;
           var query = { email: username, password: password };
           db.collection("Profile").find(query).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);
              db.close();
			  if (result.length != 0)
			  {
				  console.log("login success");
				  login_success = 1;
				  
				  //Setting session variables
				  req.session.userid = username;
				  req.session.username= result[0].firstname;
				  
				  console.log("***********************Login*********************");
	              console.log("");
				   
				  console.log("Actual session id at login: "+ req.sessionID);
				  console.log("Session userid at server set to :"+ req.session.userid);
				  console.log("Session name at server set to :"+ req.session.username);
					
				  //res.sendFile(path.join(SRC_DIR,"home.html"));
				  //  res.status(200).send(req.session);
				  
					   
				       res.redirect('/home');
				  
			  }
			  else
			  {
				  
				  //**It is for when user come to login page with entering wrong credentials
				  login_success = 2;
				  console.log("login failed");
				  res.redirect('http://localhost:8080');
				  
			  }
			  
			  
            });
        });
	
	 	
});

//export this router to use in our server.js
module.exports = router;