import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery"; //var $ = require("jquery");

require("!style-loader!css-loader!./../css/registration.css");
// // require('/../css/registration.css');

// require("file-loader?name=index.html!./../views/index.html");


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

   if ( value == "pleaselogin")
   {
    // console.log ("All Cookies : " + allcookies );
	  $(".header").css("height", 85);
	  console.log ("Displaying your are successfully registered please click here to login ");
	  $(".headerMessage").show();
   }

});


