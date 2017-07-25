var express = require('express');
var path = require("path");
var app = express();
var DIST_DIR = path.join(__dirname, "bin");



//Setting the static file diretory so that the bundle files can be accessed inside html files. (Other wise 404 error)
app.use(express.static(DIST_DIR));

//importing things file 
var things = require('./routes/things.js'); 



//Redirecting user to serve routes, which are present in "things.js" file (like /things/car, .
app.use('/things', things); 

//Now we are using the routes present in external js file (things.js)

app.listen(8080);
console.log("listening on port 8080");