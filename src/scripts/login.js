import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index.jsx';
import $ from "jquery"; //var $ = require("jquery");
import chatimage from '../images/chat.jpeg';

require('!style-loader!css-loader!./../css/login.css');
//require("file-loader?name=login.html!./../views/login.html");


/*
window.focus = function() {
	window.alert("hi");	
   // document.getElementById("username").focus();
   $('username').focus();
}


//document.write("It works.");

(function($) {
$(document).ready(function(){
	
	window.alert("hii");
	
});
});

*/

function helloWorld() {
    alert( 'Hello, world!' );
}

module.exports = {
  helloWorld: helloWorld,
};