import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Header from './Home/Header.jsx'
import Main from './Home/Main.jsx'

require("!style-loader!css-loader!./../css/header.css");
require("!style-loader!css-loader!./../css/home.css");

render((
  <BrowserRouter>
    <div>
         <Header />
         <Main />
    </div>
  </BrowserRouter>
), document.getElementById('root'));

$(function(){

   var allcookies = document.cookie;
   var cookiearray = allcookies.split(';');
   console.log(allcookies);
   for(var i=0; i<cookiearray.length; i++)
   {
     var name = cookiearray[i].split('=')[0];
     var value = cookiearray[i].split('=')[1];
     console.log ("Key is : " + name + " and Value is : " + value);
   }

});
