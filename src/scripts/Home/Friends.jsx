import React from 'react'
import friendimage from '../../images/friend.jpg';

require("!style-loader!css-loader!./../../css/friends.css");


// var divstyle={
// color:red;
// }

class Friends extends React.Component {
constructor(props) {
    super(props);
  //window.alert("Home Constructor called");
  // this.state = {username: ""};
  // this.state = {receiver: "okkk"};
  // this.state = {userid: ""};
  //   this.state = {messages: [],socket: io.connect('http://localhost:8080')};
  // this.friendChat = this.friendChat.bind(this);
  this.send = this.send.bind(this);
  //this.friendChat=this.friendChat.bind(this);
  
  }




  send(id) {
  console.log("clicked on id"+id);



  //adding friend to friends collection
  $.ajax({
    type: "POST",
    url: "/friends/addFriend",
    data:'id='+id,
    // beforeSend: function(){
    //   $("#searchnewfriends").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
    // },
    success: function(data){
      console.log(data);

 //  var newMessage = $('#message').val();
 //  console.log("Receiver set to: "+this.state.receiver);
 
 //  //This calls socket.on('new message') function of server side. Here it's user defined function.
 // // this.state.socket.emit('new message', this.state.username +": "+ message);
 //    this.state.socket.emit('new message', {message: newMessage, receiver: this.state.receiver});
  
 //  document.getElementById("message").value="";
  
 }
});
}

componentDidMount() {
     console.log('Component DID MOUNT!')
   
 
   $(document).ready(function(){
    const self = this;
	
//Searching new friends	
  $("#friends_searchnewfriends").keyup(function(){
    $.ajax({
    type: "GET",
    url: "/friends",
    data:'keyword='+$(this).val(),
    // beforeSend: function(){
    //   $("#searchnewfriends").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
    // },
    success: function(data){
      console.log(data);
      var myNode = document.getElementById("friends_newFriendSuggestion-box");
      myNode.innerHTML = '';
	  
	  if(data == "Empty")
	  {
		 return; 
	  }

      //Displaying friends in div
      for (var i = 0; i < data.length; i++) 
        {
           // console.log("Friend: "+ data[i]);
           var li=document.createElement("li");
               //var br=document.createElement("br");
                 li.appendChild(document.createTextNode(data[i].email));
                var button = document.createElement("button");
                button.innerHTML = "add";
                button.setAttribute("id",data[i].email);
                li.appendChild(button);



           //       li.appendChild(document.createElement("button"));
           //       button.innerHTML = "add";
           // li.setAttribute("id",data[i]);
         
         //Adding on click event for each friend
               // li.setAttribute("onclick","friendChat()");
        // li.addEventListener("click", function() { friendChat(this.id); }, false);
         // console.log(this.state.receiver);
         button.addEventListener("click", function() { self.send(this.id); }, false);
                 document.getElementById("friends_newFriendSuggestion-box").appendChild(li);
        }
      


      $("#friends_newFriendSuggestion-box").show();
      // $("#suggestion-box").html(html);
      $("#friends_btn1").click(function(){
        console.log("clicked");
      });
    }.bind(this)

    });
  });


//Displaying friends
$.ajax({
    type: "GET",
    url: "/friends/myFriends",
    success: function(data){
      
      if (data == "No friends")
      {
        console.log("**************No friends exist");
        document.getElementById('friends_friends').innerHTML = "Please add friends";
      }
      else
      {
      //Extracting friends names from dictionary
	  var ids = Object.keys(data);
	  console.log("Names$$$$$$$: "+ids);
	  
      //Displaying friends in div
      for (var i = 0; i < ids.length; i++) 
        {
           console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$Friend******************: "+ ids[i]);
           var li=document.createElement("li");
               //var br=document.createElement("br");
           li.appendChild(document.createTextNode(ids[i]));
           li.setAttribute("id",ids[i]);
           document.getElementById("friends_friends").appendChild(li);
		   
		   console.log("*******************Friend appended*************************************************: ");
        }
      }
       
    }.bind(this)
   });

  }.bind(this));
  
 }
  
  
 render(){

   return (
   
   
  <div className="friends_main" className="container">
  
  
         <div className="friends_header">
             <div>
		         <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">+ Add new friend</button>
		      </div>
	     </div>
		
           <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog">
    
                 <div className="modal-content">
				 
                      <div className="modal-header">
                         <button type="button" className="close" data-dismiss="modal">&times;</button>
                         <h4 className="modal-title">Friends</h4>
                      </div>
					  
                      <div className="modal-body">
                         <div className="friends_searchModel">
		                   Search new friends  <input type="search" placeholder="Enter emailid..." autoComplete="off" id="friends_searchnewfriends"/>
                           <div id="friends_newFriendSuggestion-box"></div>
                          </div>
						  
                      </div>
					
					  <div className="modal-footer">
                           <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
					
                 </div>
      
               </div>
           </div>
	
    <div className="friends_allFriends" id="friends_friendlistall">
	   Friends
       <ul id="friends_friends" className="friens_friendli"></ul>
    </div>
	
	
  </div>

 
 )}
}

export default Friends



