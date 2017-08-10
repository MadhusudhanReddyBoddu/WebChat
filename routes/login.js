var express = require('express');
var router = express.Router();
var path = require("path");
var SRC_DIR=path.join(__dirname, "../src/views");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var cookieParser = require('cookie-parser'); 
var login_success = 0;


router.use(cookieParser());

router.get('/', function(req, res){
	
	//Clearing cookie
	    res.clearCookie("login_message");
	
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
				  res.redirect('http://localhost:8080/home');
				  
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