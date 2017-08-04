import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index.jsx';
import $ from "jquery"; //var $ = require("jquery");

require('!style-loader!css-loader!./../css/login.css');
require("file-loader?name=login.html!./../views/login.html");

function focus() {
    document.getElementById("username").focus();
}
