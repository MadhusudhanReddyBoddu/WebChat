var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

//Connection string to database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/WebChat";

//Sends all users based on key input.
router.get('/',function(req, res){

        var keyword=req.query.keyword;
		
		if (keyword == "")
		{
			console.log("nothing entered");
			res.send("Empty");
		}
		
		else
		{
			
		  var like=".*" + keyword + ".*";
		    //like = "Abhilashreddy396@gmail.com";
        
		  var query = {};
          query["email"] = { "$regex": like, "$options": "i" };
		
          console.log(query);
        
          // var regex = new RegExp(req.body.term);

            console.log("keyword is:" + keyword);

          //Comparing username and password.
	       MongoClient.connect(url, function(err, db) {
           if (err) throw err;
           // var query = ({},{firstname:1,email:1,_id:0});
           // var query={email:"ricky@gmail.com"};
           // db.collection("Profile").find({"email":new RegExp(like)},{firstname:1,email:1,_id:0}).toArray(function(err, result) {
			db.collection("Profile").find(query,{firstname:1,email:1,_id:0}).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);

              //displaying just email
              result.forEach(
                  function(doc) {
                      console.log(doc.email);
                  });

              // console.log(req);
              db.close();
              res.send(result);
	
	
              });
			
           });
	    }
		  
});



//Search Within friends based on key input.
router.get('/searchWithinFriends',function(req, res){

        var keyword=req.query.keyword;
		
		if (keyword == "")
		{
			console.log("nothing entered");
			res.send("Empty");
		}
		
		else
		{
			
		  var existingFriends = "";
		    //like = "Abhilashreddy396@gmail.com";

            console.log("keyword is:" + keyword);

	       var userid = req.session.userid;
           var query = { email: userid};
		   MongoClient.connect(url, function(err, db) {
			if (err) throw err;  
            db.collection("Friends").find(query).toArray(function(err, result) {
			   if (err) throw err;
			   if(result.length != 0)
			   {
			      console.log("Existing friends: "+result[0].friends);
			      existingFriends = result[0].friends;
			   
			      //Now we have to check result values with "like" pattern. Only those, which match will be sent.
			      for (var i = 0; i < existingFriends.length; i++) 
                  {
                     var re = new RegExp(keyword, 'gi');
                     var matched = existingFriends[i].match(re);
			   
			         //console.log("length: "+ matched.length);
			         if (matched!= null)
			         {
				       console.log("Matched with existing friend: "+existingFriends[i]);
				   
			         }
			         else
			         {
				        console.log("Doesn't match with: "+existingFriends[i]);
				        existingFriends.splice(i, 1);
				        i = i-1;
			          }
			   
			     
			        }
			        console.log("Sent: "+existingFriends);
			        res.send(existingFriends);
			   }
			   else
			   {
				    res.send("Empty");
			   }
			   
		   });
		 
		  });
		  
		}
		   
		  
			
 });






//Sends personal friends
router.get('/myFriends',urlencodedParser, function(req, res){
	  
	  
	 console.log("Myfriends Called");

	   MongoClient.connect(url, function(err, db) {
           if (err) throw err;
		   var userid = req.session.userid;
           var query = { email: userid};
		   //console.log("user id in myfriends: "+userid);
           db.collection("Friends").find(query).toArray(function(err, result) {
              if (err) throw err;
              console.log("**************"+ result);
              db.close();
			  if (result.length != 0)
			  {
				  console.log("Friends exist");
				  //Storing all friends
				  var friends= result[0].friends;
				  var friends_dictionary = {};
				  
				  //For checking notification for the chat
					friends.forEach(function (friend) {
						  
				       console.log("Friend :"+friend);
					   
					 
					   //Checking any sender friend have status = 1 for the user receiver 
					   MongoClient.connect(url, function(err, db) {
						   
                           if (err) throw err;
						   //console.log("length for "+ friends[i] +": ");
                           var query = { senderId: friend, receiverId: userid, status: 1 };
                           db.collection("Messages").find(query).toArray(function(err, result) {
                               if (err) throw err;
                               //console.log(result.length);
                               db.close();
			                  if (result.length != 0)
			                   {
								   //Notification
                                   	console.log("Notification for friend: "+ friend);
                                    									
							       friends_dictionary[friend] = 1; 
								   console.log ("*********************"+ friends_dictionary[friend])
					           }
						      else
						       {
								   //No notification
								   console.log("No Notification for friend: "+ friend);
							      friends_dictionary[friend] = 0; 
								  console.log ("*********************"+ friends_dictionary[friend])
						       }
							   
							   console.log(Object.keys(friends_dictionary));
						
					       });
					    });
                       
                     });
				   //res.send(friends_dictionary);
				   
				   setTimeout(function(){ 
				      console.log("Waited for a second"); 
				      console.log("Before send keys****************"+ Object.keys(friends_dictionary));
				      for(i in friends_dictionary) 
				      {
                        console.log (i, friends_dictionary[i]);
                      }
				       res.send(friends_dictionary);
				   }, 100);
			  }
			  else
			  {  
				  res.send("No friends");
				  
			  }
			  
			  
            });
        });
	
	 	
});




//Sends people who are not friends but still sent message to the user. 
router.get('/unknownFriends',urlencodedParser, function(req, res){
	  
	  
	 console.log("Unknown friends Called");
	 res.send("Unknown Friends");
	 	
});





//export this router to use in our server.js
module.exports = router;