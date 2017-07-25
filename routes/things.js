var express = require('express');
var router = express.Router();
var path = require("path");
var SRC_DIR=path.join(__dirname, "../src/views");

router.get('/', function(req, res){
	
	res.sendFile(path.join(SRC_DIR,"index.html"));
	
});


router.get('/car', function(req, res){
	res.send('This is car route.');
});
router.get('/bus', function(req, res){
	res.send('This is bus route.');
});

//export this router to use in our server.js
module.exports = router;