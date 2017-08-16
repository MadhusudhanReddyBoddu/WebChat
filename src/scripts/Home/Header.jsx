import React from 'react'
import { NavLink } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
class Header extends React.Component {
 render() {
   return (
   
  <header>
   
   
   <div className="header_header">
      <div className="header_headerText">
        <font size="6">Web Chat</font>
      </div>
   </div>
   
   
    <div className="header_list">
      <ul>
        <li><NavLink to='/home' activeStyle={{ color: 'red' }} className="navLink">Home</NavLink></li>
        <li><NavLink to='/profile' activeStyle={{ color: 'red' }} className="navLink">Profile</NavLink></li>
        <li><NavLink to='/friends' activeStyle={{ color: 'red' }} className="navLink">Friends</NavLink></li>
		<li><NavLink to='/settings' activeStyle={{ color: 'red' }} className="navLink">Settings</NavLink></li>
        <li><NavLink to='/help' activeStyle={{ color: 'red' }} className="navLink">Help</NavLink></li>
      </ul>
    </div>
	
	<hr />
	
  </header>
  
  
 )}
}

export default Header