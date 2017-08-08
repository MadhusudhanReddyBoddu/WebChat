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
	 
	  
	  //Clearing cookie
	    res.clearCookie("register_message");
		
	  //Set cookie to display message at client
	  //If registration is success
	  
	  if (register_success == 1)
	  {
	     res.cookie('register_message', 'pleaselogin');
		 console.log("Cookie set");
		 register_success = 0;
	  }
	  else
	  {
		  console.log("Cookie not set" + register_success);
	  }
	   
	  res.sendFile(path.join(SRC_DIR,"registration.html"));
     // res.sendFile(path.join(__dirname, '../bin', 'login.html'));
});

router.post('/', urlencodedParser, function (req, res){
	
	
	
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
			 
             db.close();
			 
			 //Here we have check whether user already exist also.
			 register_success = 1;
			 console.log("Registered Successfully");
			 
            });
        });
		
		
	    
	
       // *****Always user stays in registration page but with different messages based on "rigister_success" value.
	    setTimeout(function(){
	 	res.redirect('http://localhost:8080/registration');
		}, 2000);
		
		
		//res.render("/register");
		//res.end();
		
	
	   //console.log(response);  
      //res.end(JSON.stringify(response));
	  //res.send("Home Page");
     // res.sendFile(path.join(__dirname, '../bin', 'login.html'));
});

//export this router to use in our server.js
module.exports = router;