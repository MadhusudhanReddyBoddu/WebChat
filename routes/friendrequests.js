var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

//Connection string to database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/WebChat";


//Adds friend-request to the both users friendRequest collections 
router.post('/addNewFriendRequest',urlencodedParser, function(req, res){
	  
	  
	 console.log(req.body.id);

	 var friendid=req.body.id;
	 var userid = req.session.userid;
	   
	 //Connection string to datanbase
	   var MongoClient = require('mongodb').MongoClient;
       var url = "mongodb://localhost:27017/WebChat";

     //updating friends in friends collections
	   MongoClient.connect(url, function(err, db) {
           if (err) throw err;
		   console.log("Friend requst sent to: "+friendid+" from: "+userid)
		   
           // upsert: true creates new document, if not exist.
           db.collection("Friendrequests").update({email:userid},{$push:{friendRequestsSent:friendid}},{ upsert : true });
		   db.collection("Friendrequests").update({email:friendid},{$push:{friendRequestsReceived:userid}},{ upsert : true });
           db.close();
		   res.send("success");
			  

        });
	
	 	
});



//Returns sent Friend-requests for a user
router.get('/friendRequestsSent',urlencodedParser, function(req, res){
	  
	  
	 console.log("FriendRequests Sent Called");

	   MongoClient.connect(url, function(err, db) {
		   
           if (err) throw err;
		   var userid = req.session.userid;
           var query = { email: userid};
		   //console.log("user id in myfriends: "+userid);
		   
           db.collection("Friendrequests").find(query).toArray(function(err, result) {
              if (err) throw err;
              console.log("**************"+ result);
              db.close();
			  
			  
			  //Since we are going to delete the documents with no friend requests sent and received, there the document should present.
			    //Same in friends collection also.
			  if (result.length != 0)
			  {
				  console.log("Friends exist");
				  //Storing all friends
				  var friendRequestsSent= result[0].friendRequestsSent;
				  
				  // Checking "Whether user has "received friend requests" but not "sent friend requests" ".
				     //Undefined , before user's first time friend-request Sent (then there only received friend-request field exist).
					 
				  console.log("Friend-Requests Sent are: "+ friendRequestsSent);
				  if(friendRequestsSent == undefined || friendRequestsSent.length == 0)
				  {
				   res.send("No sent-friendRequests");
				  }
				  
				  else
				  {
					  res.send(friendRequestsSent);
				  }
				  
			  }
				
			  else
			  {  
				  res.send("No sent-friendRequests");
				  
			  }
			  
			  
            });
        });
	
	 	
});


//Cancelling friend-request sent. Deleting friend request from both users friend-requests collections.
router.post('/cancelSentFriendRequest',urlencodedParser, function(req, res){
	  
	  
	 console.log(req.body.id);

	 var friendid=req.body.id;
	 var userid = req.session.userid;

     //updating friends in friends collections
	   MongoClient.connect(url, function(err, db) {
           if (err) throw err;
		   console.log("Friend requst-cancel sent to: "+ friendid +" from: "+userid)
		   
           // upsert: true creates new document, if not exist.
           db.collection("Friendrequests").update({email:userid},{$pull:{friendRequestsSent:friendid}});
		   db.collection("Friendrequests").update({email:friendid},{$pull:{friendRequestsReceived:userid}});
		   
		   //Here we have to check whether any friendrequests list empty. So we can delete.
		   
		   
           db.close();
		   res.send("success");
			  

        });
	
	 	
});


//Returns Received Friend-requests for a user
router.get('/friendRequestsReceived',urlencodedParser, function(req, res){
	  
	  
	 console.log("FriendRequests Received Called");

	   MongoClient.connect(url, function(err, db) {
		   
           if (err) throw err;
		   var userid = req.session.userid;
           var query = { email: userid};
		   //console.log("user id in myfriends: "+userid);
		   
           db.collection("Friendrequests").find(query).toArray(function(err, result) {
              if (err) throw err;
              console.log("**************"+ result);
              db.close();
			  
			  
			  //Since we are going to delete the documents with no friend requests sent and received, there the document should present.
			    //Same in friends collection also.
			  if (result.length != 0)
			  {
				  console.log("Friends exist");
				  //Storing all friends
				  var friendRequestsReceived= result[0].friendRequestsReceived;
				  console.log("Friend-Requests Received are: "+ friendRequestsReceived);
				  
				  // Checking "Whether user has "sent friend requests" but not "received friend requests" ".
				  if(friendRequestsReceived == undefined || friendRequestsReceived.length == 0)
				  {
				   res.send("No received-friendRequests");
				  }
				  
				  else
				  {
					  res.send(friendRequestsReceived);
				  }
				  
			  }
				
			  else
			  {  
				  res.send("No received-friendRequests");
				  
			  }
			  
			  
            });
        });
	
	 	
});


//Accepting friend-request received. Deleting requst from both users collections and then  Adding friend to both users friend-requests collections.
router.post('/acceptReceivedFriendRequest',urlencodedParser, function(req, res){
	  
	  
	 console.log(req.body.id);

	 var friendid=req.body.id;
	 var userid = req.session.userid;

     //updating friends in friends collections
	   MongoClient.connect(url, function(err, db) {
		   
           if (err) throw err;
		   console.log("Friend requst-cancel sent to: "+ friendid +" from: "+userid)
		   
		   //Deleting from friendrequest collection of both users
           db.collection("Friendrequests").update({email:userid},{$pull:{friendRequestsReceived:friendid}});
		   db.collection("Friendrequests").update({email:friendid},{$pull:{friendRequestsSent:userid}});
		   
		   //Adding into both users friends list
		   // upsert: true creates new document, if not exist.
           db.collection("Friends").update({email:userid},{$push:{friends:friendid}},{ upsert : true });
		   db.collection("Friends").update({email:friendid},{$push:{friends:userid}},{ upsert : true });
           db.close();
		   res.send("success");
			  

        });
	
	 	
});



//Deleting friend-request received. Deleting requst from both users collections.
router.post('/deleteReceivedFriendRequest',urlencodedParser, function(req, res){
	  
	  
	 console.log(req.body.id);

	 var friendid=req.body.id;
	 var userid = req.session.userid;

     //updating friends in friends collections
	   MongoClient.connect(url, function(err, db) {
		   
           if (err) throw err;
		   console.log("Friend requst-cancel sent to: "+ friendid +" from: "+userid)
		   
		   //Deleting from friendrequest collection of both users
           db.collection("Friendrequests").update({email:userid},{$pull:{friendRequestsReceived:friendid}});
		   db.collection("Friendrequests").update({email:friendid},{$pull:{friendRequestsSent:userid}});
		   
		   res.send("success");
			  

        });
	
	 	
});





//export this router to use in our server.js
module.exports = router;
