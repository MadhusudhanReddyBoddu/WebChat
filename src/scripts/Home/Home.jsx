import React from 'react'

class Home extends React.Component {
	
constructor(props) {
    super(props);
	//window.alert("Constructor called");
	this.state = {username: ""};
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
	 
	 //Moving scrollbar down to new message
	 var elem = document.getElementsByClassName('home_messages')[0];
     elem.scrollTop = elem.scrollHeight;
     });
	 
 $(document).ready(function(){
		 
	//Fetching username.
   var allcookies = document.cookie;
   var cookiearray = allcookies.split(';');
   for(var i=0; i<cookiearray.length; i++)
   {
     var name = cookiearray[i].split('=')[0];
     var value = cookiearray[i].split('=')[1];
	 
	 if (name == " user_name")
	 {
		 this.setState({ username: decodeURIComponent(value)});
		 console.log ("username set to: " + this.state.username);
		 break;
	 }
     
   }
   $("#username").text("Welcome " + this.state.username+"!!");
   
   
   //Loading all friends when user gets his home page
     
	 $.ajax({
		type: "GET",
		url: "/friends/myFriends",
		success: function(data){
			
			if (data == "No friends")
			{
				console.log("No friends exist");
				document.getElementById('friends').innerHTML = "Please add friends";
			}
			else
			{
			console.log("Friends: "+data);
			//Displaying friends in div
			for (var i = 0; i < data.length; i++) 
			  {
			     console.log("Friend: "+ data[i]);
			     var li=document.createElement("li");
	             //var br=document.createElement("br");
                 li.appendChild(document.createTextNode(data[i]));
			     li.setAttribute("id",data[i]);
                 document.getElementById("friends").appendChild(li);
			  }
			}
			
			
		}
	 });
	 
	 
	 
   
    //when user types in search friends textbox
	$('#searchfriend').keypress(function(e){ 
	
		  console.log("Search friend clicked");
		  
         });
		 
	
	//When user press enter-button while typing message	
    $('#message').keypress(function(e){
          if(e.keyCode==13)
            $('#send').click();
         });
 }.bind(this));
	
	 
 }
   
  
send() {
  console.log("Send called "+ $('#message').val());
  var message = $('#message').val();
  
  //This calls socket.on('new message') function of server side. Here it's user defined function.
  this.state.socket.emit('new message', this.state.username +": "+ message);
  
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
		   <p id="username" className="username"></p>
		 </div>
		</div>
		
		<div className="home_searchfriend">
		  <input type="search" id="searchfriend" placeholder="Search friends here..." autoComplete="off" />
		</div>
		<hr />
		
		<div className="home_recentfriends">
		   <ul id="friends"></ul>
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