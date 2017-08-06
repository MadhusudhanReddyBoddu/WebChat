var express = require('express');
var router = express.Router();
var path = require("path");
var SRC_DIR=path.join(__dirname, "../src/views");

router.get('/', function(req, res){
	
	  res.sendFile(path.join(SRC_DIR,"login.html"));
     // res.sendFile(path.join(__dirname, '../bin', 'login.html'));
});

//export this router to use in our server.js
module.exports = router;