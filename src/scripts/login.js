import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index.jsx';
import $ from "jquery"; //var $ = require("jquery");
import chatimage from '../images/chat.jpeg';

require('!style-loader!css-loader!./../css/login.css');
//require("file-loader?name=login.html!./../views/login.html");


//MAking Javascript function global
window.loginFocusing = function(){
	
   //window.alert("hi from javascript");	
   document.getElementById("loginusername").focus();
   
}


//document.write("It works always.");


$(function(){

  // window.alert("hi from Jquery");	   
   //$("#loginpassword").focus();

});
