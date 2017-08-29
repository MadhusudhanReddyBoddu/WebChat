import React from 'react'

class Home extends React.Component {
	
	
constructor(props) {
    super(props);
	//window.alert("Home Constructor called");
	this.state = {username: ""};
	this.state = {receiver: "okkk"};
	this.state = {userid: ""};
    this.state = {messages: [],socket: io.connect('http://localhost:8080')};
	this.friendChat = this.friendChat.bind(this);
	this.send = this.send.bind(this);
	//this.friendChat=this.friendChat.bind(this);
	
  }

  
  friendChat(friendId)
 {
        console.log("Clicked friend id: "+ friendId );
		
		//Setting receiver name
		$("#receivername").text("To: " + friendId);
		
		this.setState({ receiver: friendId});
		console.log(this.state.receiver);
		
		//Setting Previous messages for the chat	
		
 }
 

  
  
  
componentDidMount() {
     console.log('Component DID MOUNT!');
	 
	 this.state.socket.on('new message', function(data){
     var li=document.createElement("li");
	 //var br=document.createElement("br");
	 var elem = document.createTextNode("");
     //li.appendChild(document.createTextNode('<b>' + data.sender + ": </b>" + data.msg));
	 li.appendChild(elem);
	 li.innerHTML = '<b>' + data.sender + ': </b>' + data.msg;
     document.getElementById("messages").appendChild(li);
	// document.getElementById("messages").appendChild(br);
	
	 
	 
	 //Moving scrollbar down to new message
	 var elem = document.getElementsByClassName('home_messages')[0];
     elem.scrollTop = elem.scrollHeight;
     });
	 
	 
 $(document).ready(function(){
	 
   const self = this;
   //Fetching username.
   var allcookies = document.cookie;
   var cookiearray = allcookies.split(';');
   for(var i=0; i<cookiearray.length; i++)
   {
     var name = cookiearray[i].split('=')[0];
     var value = cookiearray[i].split('=')[1];
	 
	 if (name == "user_id")
	 { 
         var userid = decodeURIComponent(value);
		 this.setState({ userid: decodeURIComponent(value)});
		 console.log ("userid set to: " + this.state.userid);
	 }
		 
	 
	 if (name == " user_name")
	 {
		 var username = decodeURIComponent(value);
		 this.setState({ username: decodeURIComponent(value)});
		 console.log ("username set to: " + this.state.username);
	 }
     
   }
    
	
	//This is undefined  when moving between routes
   //$("#username").text("Welcome " + this.state.username+"!!");
   
   $("#username").text("Welcome " + username+"!!");
   
   this.state.socket.emit('new user',{username: this.state.username, userid: this.state.userid});
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
				 
				 //Adding on click event for each friend
	             // li.setAttribute("onclick","friendChat()");
				// li.addEventListener("click", function() { friendChat(this.id); }, false);
				 console.log(this.state.receiver);
				 li.addEventListener("click", function() { self.friendChat(this.id); }, false);
                 document.getElementById("friends").appendChild(li);
			  }
			}
			
			
		}.bind(this)
	 });
	 
	 this.setState({ receiver: "abhilash"});
	 console.log(this.state.receiver);
	 //When user selects one of the friends for chatting
	   /*Tried to put it like send()...but errors.*/
   
   
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
  var newMessage = $('#message').val();
  console.log("Receiver set to: "+this.state.receiver);
 
  //This calls socket.on('new message') function of server side. Here it's user defined function.
 // this.state.socket.emit('new message', this.state.username +": "+ message);
    this.state.socket.emit('new message', {message: newMessage, receiver: this.state.receiver});
  
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
	   
	   
       <div className="smallbox_center">
	    
	     <div className="home_chatbox">
	        <div className="home_receiver"> <p id="receivername"> Please Select a friend to Chat </p>
			</div>
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