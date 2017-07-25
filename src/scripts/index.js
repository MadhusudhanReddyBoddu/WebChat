import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index.jsx';
import $ from "jquery"; //var $ = require("jquery");

require('!style-loader!css-loader!./../css/index.css');

//require("file-loader?name=index.html!./../views/index.html");


ReactDOM.render(<Index />, document.getElementById('app'));