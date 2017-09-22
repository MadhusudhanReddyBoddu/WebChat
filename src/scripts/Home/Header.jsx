import React from 'react'
import { NavLink } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
class Header extends React.Component {
 render() {
   return (
   
  <header>
   
   
   <div className="row">
        <div className="col-sm-12">
         <div className="header_header">
          <font size="6">Web Chat</font>
         </div>
        </div>
   </div>
   
   <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
             <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
               <span className="icon-bar"></span>
               <span className="icon-bar"></span>
               <span className="icon-bar"></span>  
               <span className="icon-bar"></span>  
             </button>
          </div>
         <div className="row">
          <div className="collapse navbar-collapse" id="myNavbar" >
           <div className="header_list">
		    <div className="row" className="headerlinks">
                <ul className="nav navbar-nav" style={{width: '100%'}}>
                  <div className="col-md-3 col-sm-4" ><li className="navLinker"><NavLink to='/home' activeStyle={{ color: 'red' }} className="navLink">Home</NavLink></li></div>
                  <div className="col-md-2 col-sm-4" ><li className="navLinker"><NavLink to='/profile' activeStyle={{ color: 'red' }} className="navLink">Profile</NavLink></li></div>
                  <div className="col-md-2 col-sm-4" ><li className="navLinker"><NavLink to='/friends' activeStyle={{ color: 'red' }} className="navLink">Friends</NavLink></li></div>
		          <div className="col-md-2 col-sm-6" ><li className="navLinker"><NavLink to='/settings' activeStyle={{ color: 'red' }} className="navLink">Settings</NavLink></li></div>
                  <div className="col-md-3 col-sm-6" ><li className="navLinker"><NavLink to='/help' activeStyle={{ color: 'red' }} className="navLink">Help</NavLink></li></div>
                </ul>
			</div>
           </div>
		  </div>
		 </div>
		</div>
	 </nav>
	
  </header>
  
  
 )}
}

export default Header


