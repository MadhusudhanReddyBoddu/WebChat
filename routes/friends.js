var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

//Sends all users
router.get('/',function(req, res){

        var keyword=req.query.keyword;

    
        var like=".*" + keyword + ".*";

        console.log(like);
        
        // var regex = new RegExp(req.body.term);

        console.log("keyword is:" + keyword);
		    var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/WebChat";

     //Comparing username and password.
	   MongoClient.connect(url, function(err, db) {
           if (err) throw err;
           // var query = ({},{firstname:1,email:1,_id:0});
           // var query={email:"ricky@gmail.com"};
           db.collection("Profile").find({"firstname":new RegExp(like)},{firstname:1,email:1,_id:0}).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);

              //displaying just firstname
              result.forEach(
                  function(doc) {
                      console.log(doc.firstname);
                  });

              // console.log(req);
              db.close();
              res.send(result);

// cursor.forEach(
//         function(doc) {
//             console.log(doc.firstname);
//         }

	
	// 
	 // //setting cookie at client side
  //     res.clearCookie("user_id");
	 //  res.clearCookie("user_name");
	  
	 //  res.cookie('user_id', req.session.userid);
	 //  res.cookie('user_name', req.session.username);
	  
	  
  //    // res.status(200).send(req.session);
	  
	 //  res.sendFile(path.join(SRC_DIR,"home.html"));
	
  //     console.log("Cookie userid at client set to :"+ req.session.userid);
	 //  console.log("Cookie username at client set to :"+ req.session.username);
	
	
});
       });
	});







//Sends personal friends
router.get('/myFriends',urlencodedParser, function(req, res){
	  
	  
	 console.log("Myfriends Called");
	   
	   
	 //Connection string to datanbase
	   var MongoClient = require('mongodb').MongoClient;
       var url = "mongodb://localhost:27017/WebChat";

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