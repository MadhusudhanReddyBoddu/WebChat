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

  $(".headerMessage").hide();
   var allcookies = document.cookie;
   var cookiearray = allcookies.split(';');
   
   for(var i=0; i<cookiearray.length; i++)
   {
     var name = cookiearray[i].split('=')[0];
     var value = cookiearray[i].split('=')[1];
     console.log ("Key is : " + name + " and Value is : " + value);
   }

   if ( value == "incorrectCredentials")
   {
    // console.log ("All Cookies : " + allcookies );
	  $(".header").css("height", 85);
	  console.log ("Login failed ");
	  $(".headerMessage").show();
   }

});
