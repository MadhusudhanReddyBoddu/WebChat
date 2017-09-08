var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

//Connection string to datanbase
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/WebChat";

//Sends all conversation between two friends when user clicks on a chat.
router.get('/chatMessages',urlencodedParser, function(req, res){
	  
	 var receiverid = req.query.receiverId;
	 var senderid = req.session.userid;
	 
	 console.log("Called Chat Messages for the friend: "+ receiverid);
	 
	 
	 //To make chat free of notification by setting "status = 2" for that sender and receiver chat.
	 MongoClient.connect(url, function(err, db) {
                   if (err) throw err;
                   var myquery = { senderId: receiverid,receiverId: senderid };
				   //Here we can also set read time for the message.
				   
				   
                   db.collection("Messages").updateMany(myquery, {$set: { status: 2 }}, function(err, res) {
                    if (err) throw err;
                    console.log("Notification status removed for the chat: " + receiverid + " -> "+senderid);
                    db.close();
                   });
                });
	 
	 
	 //To send chat 
	 MongoClient.connect(url, function(err, db) {
           if (err) throw err;
		   
		   //Selecting messages where sender is senderid and receiver is receiverid (or) sender is receiverid and receiver is senderid in the order of time.
           //var query = "{$or:[{senderId:senderid,receiverId:receiverid},{senderId:receiverid,receiverId:senderid}]}";
		   //console.log("user id in myfriends: "+userid);
		   
		   
           db.collection("Messages").find({$or:[{senderId:senderid,receiverId:receiverid},{senderId:receiverid,receiverId:senderid}]}).toArray(function(err, result) {
              if (err) throw err;
              db.close();
			  if (result.length != 0)
			  {
				  console.log("Messages: "+ result);
				  //Storing all friends
				  var friends= result[0].friends;
				   //res.send(friends);
				   res.send(result);
				  
			  }
			  else
			  {  
				  res.send("No messages");
				  
			  }
			  
			  
            });
        });
	 
	 	
});

//export this router to use in our server.js
module.exports = router;