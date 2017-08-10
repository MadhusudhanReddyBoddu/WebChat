import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Header from './Home/Header.jsx'
import Main from './Home/Main.jsx'

require("!style-loader!css-loader!./../css/header.css");

render((
  <BrowserRouter>
    <div>
         <Header />
         <Main />
    </div>
  </BrowserRouter>
), document.getElementById('root'));