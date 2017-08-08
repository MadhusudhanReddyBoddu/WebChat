var express = require('express');
var router = express.Router();
var path = require("path");
var SRC_DIR=path.join(__dirname, "../src/views");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var cookieParser = require('cookie-parser'); 
var register_success = 0;

router.use(cookieParser());

router.get('/', function(req, res){
	  console.log("register called");
	  
	  //Clearing cookie
	    res.clearCookie("register_message");
		
	  //Set cookie to display message at client
	  //If registration is success
	  if (register_success == 1)
	  {
	     res.cookie('register_message', 'pleaselogin');
		 register_success = 0;
	  }
	   
	  res.sendFile(path.join(SRC_DIR,"registration.html"));
     // res.sendFile(path.join(__dirname, '../bin', 'login.html'));
});

router.post('/', urlencodedParser, function (req, res){
	
	console.log("database called");
	
	//Fetching form data
       var firstname = req.body.firstname;  
       var lastname  = req.body.lastname;
	   var email = req.body.email;
	   var phone = req.body.phone;
	   var password = req.body.password;
	   
	   
	 //Connection string to datanbase
	   var MongoClient = require('mongodb').MongoClient;
       var url = "mongodb://localhost:27017/WebChat";

     //Insert document into collection.
	   MongoClient.connect(url, function(err, db) {
           if (err) throw err;
           var myobj = { firstname: firstname, lastname: lastname, email: email, phone: phone, password: password };
           db.collection("Profile").insertOne(myobj, function(err, res) {
             if (err) throw err;
			 console.log("database entered");
             db.close();
            });
        });
		
		//Set this variable to 1 only when registration is success.
	    register_success = 1;
	
       // res.end("User registered successfully");
	 	res.redirect('http://localhost:8080/registration');
		
		
		//res.render("/register");
		//res.end();
		
	
	   //console.log(response);  
      //res.end(JSON.stringify(response));
	  //res.send("Home Page");
     // res.sendFile(path.join(__dirname, '../bin', 'login.html'));
});

//export this router to use in our server.js
module.exports = router;