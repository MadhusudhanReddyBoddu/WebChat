import React from 'react'

class Home extends React.Component {
	
constructor(props) {
    super(props);
    this.state = {messages: [],socket: io.connect('http://localhost:8080')};
	this.send = this.send.bind(this)
  }


componentDidMount() {
     console.log('Component DID MOUNT!')
	 
	 this.state.socket.on('new message', function(msg){
     var li=document.createElement("li");
	 //var br=document.createElement("br");
     li.appendChild(document.createTextNode(msg));
     document.getElementById("messages").appendChild(li);
	// document.getElementById("messages").appendChild(br);
	 var elem = document.getElementsByClassName('home_messages')[0];
     elem.scrollTop = elem.scrollHeight;
     });
	 
	 $(document).ready(function(){
       $('#message').keypress(function(e){
          if(e.keyCode==13)
            $('#send').click();
         });
     });
	
	 
   }
   
  
send() {
  console.log("Send called "+ $('#message').val());
  var message = $('#message').val();
  
  
  
  //Fetching username cookie and attach it to chat message before sending
   var allcookies = document.cookie;
   var cookiearray = allcookies.split(';');
   console.log(allcookies);
   for(var i=0; i<cookiearray.length; i++)
   {
     var name = cookiearray[i].split('=')[0];
     var value = cookiearray[i].split('=')[1];
	 console.log(name);
	 
	 if (name == " user_name")
	 {
		 var username = decodeURIComponent(value); 
		 console.log ("username for message set to: " + username);
		 break;
	 }
	// console.log ("In jsx Key is :"+name+"and Value is : "+value);
     
   }
  
  //This calls socket.on('new message') function of server side. Here it's user defined function.
  this.state.socket.emit('new message', username +": "+ message);
  
  document.getElementById("message").value="";
  
   }
	
		
	
 render() {
   return (
   
   
  <div>
	  
    <div className="largeBox">
	
       <div className="smallbox_left">
	   
	    <div className="home_profile">
	     <div className="home_profileimage">
	       <input type="image" id="profile_image" src = " ../../images/background.jpg" className="profile_image" /><br/>
		 </div>
		 <div className="home_username">
		   <p id="username" className="username">Welcome Anusha!!</p>
		 </div>
		</div>
		
		<div className="home_searchfriend">
		  <input type="search" id="searchfriend" placeholder="Search friends here..." autoComplete="off" />
		</div>
		<hr />
		
		<div className="home_recentfriends">
		 
		</div>
		
		 
       </div>
	   
	   
       <div className="smallbox_center">Center box
	    
	     <div className="home_chatbox">
	
	        <div className="home_messages">
	            <ul id="messages"></ul>
            </div>
			
            <div className="home_messagesfixed">
                <span><input id="message" placeholder="Enter text here..." autoComplete="off" /></span><span><button id="send" onClick = {this.send}>SEND</button></span>
            </div>
	  
         </div>
		 
	   </div>
	
	</div>
	
	
  </div>
  
  
   )
  }


}

export default Home