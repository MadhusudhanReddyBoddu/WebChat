var express = require('express');
var router = express.Router();
var path = require("path");
var SRC_DIR=path.join(__dirname, "../src/views");

router.get('/', function(req, res){
	
	
	 //setting cookie at client side
      res.clearCookie("user_id");
	  res.clearCookie("user_name");
	  
	  res.cookie('user_id', req.session.userid);
	  res.cookie('user_name', req.session.username);
	  
	  
     // res.status(200).send(req.session);
	  
	  res.sendFile(path.join(SRC_DIR,"home.html"));
	  
	  
	  console.log("***********************Home*********************");
	  console.log("");
	  console.log("Actual session id at home: "+ req.sessionID);
      console.log("Cookie userid at client set to :"+ req.session.userid);
	  console.log("Cookie username at client set to :"+ req.session.username);
	
	
});


//export this router to use in our server.js
module.exports = router;