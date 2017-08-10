import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Profile from './Profile.jsx'
import Friends from './Friends.jsx'
import Settings from './Settings.jsx'
import Help from './Help.jsx'

// The Main component renders one of the three provided
// Routes (provided that one matches). 
class Main extends React.Component {
 render() {
   return (
   
   
  <main>
    <Switch>
      <Route path='/home' exact component={Home}/>
      <Route path='/profile' component={Profile}/>
      <Route path='/friends' component={Friends}/>
	  <Route path='/settings' component={Settings}/>
      <Route path='/help' component={Help}/>
    </Switch>
  </main>
  
  
)}
}

export default Main