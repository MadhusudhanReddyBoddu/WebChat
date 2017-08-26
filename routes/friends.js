var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 


router.get('/myFriends',urlencodedParser, function(req, res){
	  
	  
	 console.log("Myfriends Called");
	   
	   
	 //Connection string to datanbase
	   var MongoClient = require('mongodb').MongoClient;
       var url = "mongodb://localhost:27017/WebChat";

     //Comparing username and password.
	   MongoClient.connect(url, function(err, db) {
           if (err) throw err;
		   var userid = req.session.userid;
           var query = { email: userid};
		   console.log("user id in myfriends: "+userid);
           db.collection("Friends").find(query).toArray(function(err, result) {
              if (err) throw err;
              console.log("**************"+ result);
              db.close();
			  if (result.length != 0)
			  {
				  console.log("Friends exist");
				  //Storing all friends
				  var friends= result[0].friends;
				   //res.send(friends);
				   res.send(friends);
				  
			  }
			  else
			  {  
				  res.send("No friends");
				  
			  }
			  
			  
            });
        });
	
	 	
});

//export this router to use in our server.js
module.exports = router;