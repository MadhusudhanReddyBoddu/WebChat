import React from 'react'
import friendimage from '../../images/friend.jpg';

require("!style-loader!css-loader!./../../css/friends.css");


class Friends extends React.Component {
constructor(props) {
    super(props);
  //window.alert("Home Constructor called");
  // this.state = {username: ""};
  // this.state = {receiver: "okkk"};
  // this.state = {userid: ""};
  //   this.state = {messages: [],socket: io.connect('http://localhost:8080')};
  // this.friendChat = this.friendChat.bind(this);
  this.sendFriendRequest = this.sendFriendRequest.bind(this);
  this.cancelSentFriendRequest = this.cancelSentFriendRequest.bind(this);
  this.acceptReceivedFriendRequest = this.acceptReceivedFriendRequest.bind(this);
  this.deleteReceivedFriendRequest = this.deleteReceivedFriendRequest.bind(this);
  //this.friendChat=this.friendChat.bind(this);
  
  }


  
  //Adding friend-request when user clicks on add friend button for new friend.
  sendFriendRequest(id) {
  console.log("clicked on id"+id);
   //window.alert("hhhhhh");
  $.ajax({
    type: "POST",
    url: "/friendrequests/addNewFriendRequest",
    data:'id='+id,
    success: function(data){
      console.log(data);
	  if (data == "success")
	  {  
         document.getElementById("friendRequestsentSuccess").style.display = "block"; 
         setTimeout(function() 
         { 
              document.getElementById("friendRequestsentSuccess").style.display = "none"; 
         }, 5000);

		 
	  }
	  else
	  {
		  window.alert("Something went wrong");
	  }
  
     },
    error:   function(jqXHR, textStatus, errorThrown) {
        alert("Error, status = " + textStatus + ", " +"error thrown: " + errorThrown);
     }
  });
 }
 
 
 //Cancelling FriendRequest When user clicks on CancelFriend request button inside sentReuests.
  cancelSentFriendRequest(id) 
 {
  console.log("clicked on id"+id);
   //window.alert("hhhhhh");
  $.ajax({
    type: "POST",
    url: "/friendrequests/cancelSentFriendRequest",
    data:'id='+id,
    success: function(data){
      console.log(data);
	  if (data == "success")
	  {  
         //Hiding the button in findfriend modal for the user. Because, due to this delete action.. button content may vary.
        // document.getElementById(id).style.display = "none";
		 
         document.getElementById("cancelSentFriendRequestSuccess").style.display = "block"; 
         setTimeout(function() 
         { 
              document.getElementById("cancelSentFriendRequestSuccess").style.display = "none"; 
         }, 3000);

		 
	  }
	  else
	  {
		  window.alert("Something went wrong");
	  }
  
     },
    error:   function(jqXHR, textStatus, errorThrown) {
        alert("Error, status = " + textStatus + ", " +"error thrown: " + errorThrown);
     }
  });
 }
 
 
 
 //Accepting received friend request.
  acceptReceivedFriendRequest(id) 
 {
  console.log("clicked on id"+id);
   //window.alert("hhhhhh");
  $.ajax({
    type: "POST",
    url: "/friendrequests/acceptReceivedFriendRequest",
    data:'id='+id,
    success: function(data){
      console.log(data);
	  if (data == "success")
	  {  
         //Hiding the button in findfriend modal for the user. Because, due to this delete action.. button content may vary.
        // document.getElementById(id).style.display = "none";
		 console.log("Friend request accepted for : "+ id);
         document.getElementById("acceptReceivedFriendRequestSuccess").style.display = "block"; 
         setTimeout(function() 
         { 
              document.getElementById("acceptReceivedFriendRequestSuccess").style.display = "none"; 
         }, 3000);

		 
	  }
	  else
	  {
		  window.alert("Something went wrong");
	  }
  
     },
    error:   function(jqXHR, textStatus, errorThrown) {
        alert("Error, status = " + textStatus + ", " +"error thrown: " + errorThrown);
     }
  });
 }
 
 
 //Deleting received Friend-Request When user clicks on Delete button in friend-requests.
  deleteReceivedFriendRequest(id) 
 {
  console.log("clicked on id"+id);
   //window.alert("hhhhhh");
  $.ajax({
    type: "POST",
    url: "/friendrequests/deleteReceivedFriendRequest",
    data:'id='+id,
    success: function(data){
      console.log(data);
	  if (data == "success")
	  {  
         //Hiding the button in findfriend modal for the user. Because, due to this delete action.. button content may vary.
        // document.getElementById(id).style.display = "none";
		 
         document.getElementById("deleteReceivedFriendRequestSuccess").style.display = "block"; 
         setTimeout(function() 
         { 
              document.getElementById("deleteReceivedFriendRequestSuccess").style.display = "none"; 
         }, 3000);

		 
	  }
	  else
	  {
		  window.alert("Something went wrong");
	  }
  
     },
    error:   function(jqXHR, textStatus, errorThrown) {
        alert("Error, status = " + textStatus + ", " +"error thrown: " + errorThrown);
     }
  });
 }
 
 
 

 
componentDidMount() {
	
	
	
	
   console.log('Component DID MOUNT!')
   
 
   $(document).ready(function(){
	   
    const self = this;
	
	document.getElementById("friendRequestsentSuccess").style.display = "none";
    document.getElementById("cancelSentFriendRequestSuccess").style.display = "none";
	document.getElementById("acceptReceivedFriendRequestSuccess").style.display = "none";
	document.getElementById("deleteReceivedFriendRequestSuccess").style.display = "none";
	
//When user clicks clear button for a search newfriends.
$('#friends_searchnewfriends').on('search', function () {
 // search logic here
 // this function will be executed on click of X (clear button)
 console.log("Clear clicked");
 var myNode = document.getElementById("friends_newFriendSuggestion-boxlist");
 myNode.innerHTML = '';
 });
	
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
      var myNode = document.getElementById("friends_newFriendSuggestion-boxlist");
      myNode.innerHTML = '';
	  myNode.setAttribute("class","alert alert-info");
	  
	  if(data == "Empty")
	  { 
		 return; 
	  }
	  
	  if(data.length == 0)
	  {  
        myNode.setAttribute("class","alert alert-warning");
		myNode.innerHTML = 'Sorry! We have no serach results for "'+ document.getElementById("friends_searchnewfriends").value+'"'; 
		
		 return; 
	  }

      //Displaying friends in div
      for (var i = 0; i < data.length; i++) 
        {
           // console.log("Friend: "+ data[i]);
           var li=document.createElement("li");
               //var br=document.createElement("br");
                 li.appendChild(document.createTextNode(data[i].email + "   "));
                var button = document.createElement("button");
                button.innerHTML = "addFriend";
                button.setAttribute("id",data[i].email);
				button.setAttribute("class","btn btn-success");
                li.appendChild(button);

                button.addEventListener("click", function() { self.sendFriendRequest(this.id); }, false);
                document.getElementById("friends_newFriendSuggestion-boxlist").appendChild(li);
        }
    }.bind(this)

    });
  });
  
  
  
  
  //Searching inside existing friends	
  $("#friends_searchWithinFriends").keyup(function(){
	console.log("Friends search within existinging friends started");
    $.ajax({
    type: "GET",
    url: "/friends/searchWithinFriends",
    data:'keyword='+$(this).val(),
    // beforeSend: function(){
    //   $("#searchnewfriends").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
    // },
    success: function(data){
		
	 var myNode = document.getElementById('friends_friends');
         myNode.innerHTML = '';
		
	   if (data == "Empty")
      {
        
		//Use ajax call to display all existing friends again.
		console.log("Calling Ajax again to default ffriends");
		
		    //Displaying friends
                $.ajax({
                       type: "GET",
                       url: "/friends/myFriends",
                       success: function(data){
      
                        if (data == "No friends")
                           {
                              console.log("**************No friends exist");
		                          var myNode = document.getElementById('friends_friendlistall');
                                  myNode.innerHTML = '';
	                              myNode.setAttribute("class","alert alert-info");
                                  myNode.innerHTML = "You have no friends!!. Please add new friends";
                            }
                        else
                            {
                                 //Extracting friends names from dictionary
	                             var ids = Object.keys(data);
	                             console.log("Names$$$$$$$: "+ids);
	  
                                 //Displaying friends in div
                                 for (var i = 0; i < ids.length; i++) 
                                   {
                                     console.log("Friend: "+ ids[i]);
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
		
      }	
	  
      else if (data.length == 0)
      {
        console.log("**************No friends exist");
	        myNode.setAttribute("class","alert alert-info");
            myNode.innerHTML = " No friends Found!!.";
      }
      else
      {
	  console.log("Search result Names for Within Friends: "+ data);
	  
      //Displaying friends in div
      for (var i = 0; i < data.length; i++) 
        {
           console.log("Friend&&&&&&&: "+ data[i]);
           var li=document.createElement("li");
               //var br=document.createElement("br");
           li.appendChild(document.createTextNode(data[i]));
           li.setAttribute("id",data[i]);
           document.getElementById("friends_friends").appendChild(li);
		   
		   console.log("*******************Friend appended*************************************************: ");
        }
      }
       
    }.bind(this)

    });
  });


  
  
 //Showing Sent Friend-requests, when user clicks on sent-requests button	
  $("#sentRequestsButton").click(function(){
    $.ajax({
    type: "GET",
    url: "/friendrequests/friendRequestsSent",
    data:'keyword='+$(this).val(),
    // beforeSend: function(){
    //   $("#searchnewfriends").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
    // },
    success: function(data){
      console.log(data);
      var myNode = document.getElementById("friends_friendRequestsSentBoxlist");
      myNode.innerHTML = '';
	  myNode.setAttribute("class","alert alert-info");
	  
	  if(data == "No sent-friendRequests")
	  {
		  myNode.innerHTML = 'Sorry! You have no sent friend-requests';
		  
	  }
      else
	  {
      //Displaying friends in div
      for (var i = 0; i < data.length; i++) 
        {
           console.log("Friend request sent to: "+ data[i]);
           var li=document.createElement("li");
               //var br=document.createElement("br");
                li.appendChild(document.createTextNode(data[i] + "   "));
                var button = document.createElement("button");
                button.innerHTML = "Cancel Friend-request";
                button.setAttribute("id",data[i]);
				button.setAttribute("class","btn btn-danger");
                li.appendChild(button);

                button.addEventListener("click", function() { self.cancelSentFriendRequest(this.id); }, false);
                document.getElementById("friends_friendRequestsSentBoxlist").appendChild(li);
        }
	  }
      
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
		var myNode = document.getElementById('friends_friendlistall');
            myNode.innerHTML = '';
	        myNode.setAttribute("class","alert alert-info");
            myNode.innerHTML = "You have no friends!!. Please add new friends";
      }
      else
      {
      //Extracting friends names from dictionary
	  var ids = Object.keys(data);
	  console.log("Names$$$$$$$: "+ids);
	  
      //Displaying friends in div
      for (var i = 0; i < ids.length; i++) 
        {
           console.log("Friend: "+ ids[i]);
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
 

//Displaying friend-requests received.
$.ajax({
    type: "GET",
    url: "/friendrequests/friendRequestsReceived",
    success: function(data){
      
      console.log(data);
      var myNode = document.getElementById("friends_friendRequestsReceivedBoxlist");
      myNode.innerHTML = '';
	  document.getElementById("friends_friendRequestsReceivedBox").setAttribute("class","alert alert-info");;
	  
	  if(data == "No received-friendRequests")
	  {
		  myNode.setAttribute("class","alert alert-info");
		  myNode.innerHTML = 'Sorry! You have no Received friend-requests';
		  
	  }
      else
	  {
      //Displaying friends in div
      for (var i = 0; i < data.length; i++) 
        {
           console.log("Friend request Received from: "+ data[i]);
           var li=document.createElement("li");
                
				li.setAttribute("class","col-md-6 col-sm-6 col-xs-12");
                li.appendChild(document.createTextNode(data[i] + "   "));
				
				var buttonAccept = document.createElement("button");
                buttonAccept.innerHTML = "Accept";
                buttonAccept.setAttribute("id",data[i]);
				buttonAccept.setAttribute("class","btn btn-success");
                li.appendChild(buttonAccept);
				
                var buttonDelete = document.createElement("button");
                buttonDelete.innerHTML = "Delete";
                buttonDelete.setAttribute("id",data[i]);
				buttonDelete.setAttribute("style", "margin-left:10px;");
				buttonDelete.setAttribute("class","btn btn-danger");
                li.appendChild(buttonDelete);
				
				
                buttonAccept.addEventListener("click", function() { self.acceptReceivedFriendRequest(this.id); }, false);
				buttonDelete.addEventListener("click", function() { self.deleteReceivedFriendRequest(this.id); }, false);
				
                document.getElementById("friends_friendRequestsReceivedBoxlist").appendChild(li);
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
            <div className="friends_headerrow" className="row">
			
			
			    <div className="col-md-4 col-md-offset-2 col-sm-5 col-sm-offset-1 col-sm-push-6 col-xs-12" style={{marginTop: "25px"}}>
				 
				       <button type="button" className="btn btn-success btn-md" data-toggle="modal" data-target="#searchNewFriendsModal">+ Add new friend</button>
				       <button type="button" id="sentRequestsButton" className="btn btn-info btn-md" data-toggle="modal" data-target="#sentRequestsModal" style={{marginLeft: "10px"}}>Sent requests</button>
		               
				  
				 </div>
			
                 <div className="col-md-6 col-sm-6 col-sm-pull-5 col-xs-12" style={{marginTop: "10px"}}>
				 
				   <div className="form-group">
                     <label>Search in friendslist:</label>
                     <input type="search" placeholder="Enter emailid..." autoComplete="off" id="friends_searchWithinFriends" className="friends_searchWithinFriends" className="form-control"  />
                   </div>
				   
				 </div>
				 
				 
		    </div>
		   </div>
		
           <div className="modal fade" id="searchNewFriendsModal" role="dialog">
              <div className="modal-dialog">
    
                 <div className="modal-content">
				 
                      <div className="modal-header">
                         <button type="button" className="close" data-dismiss="modal">&times;</button>
                         <h4 className="modal-title">Friends</h4>
                      </div>
					  
                      <div className="modal-body">
                         <div className="friends_searchModel">
		                   Search new friends  <input type="search" placeholder="Enter emailid..." autoComplete="off" id="friends_searchnewfriends" />
                           <div id="friends_newFriendSuggestion-box" className="friends_newFriendSuggestion-box">
						     <ul id="friends_newFriendSuggestion-boxlist" className="friends_newFriendSuggestion-boxlist"></ul>
						   </div>
                          </div>
						  
                      </div>
					
					  <div className="modal-footer">
					       <div className="alert alert-success" id="friendRequestsentSuccess">
                                  <strong>Success!</strong>Friend-request sent Successfully
                           </div>
                           <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
					
                 </div>
      
               </div>
			   
			   
           </div>
		   
		   
		    <div className="modal fade" id="sentRequestsModal" role="dialog">
              <div className="modal-dialog">
    
                 <div className="modal-content">
				 
                      <div className="modal-header">
                         <button type="button" className="close" data-dismiss="modal">&times;</button>
                         <h4 className="modal-title">Sent Friend-requests</h4>
                      </div>
					  
                      <div className="modal-body">
					  
                         <div className="friends_friendRequstsSentModal">
                           <div id="friends_friendRequestsSentBox" className="friends_friendRequestsSentBox">
						    <ul id="friends_friendRequestsSentBoxlist" className="friends_friendRequestsSentBoxlist"></ul>
						   </div>
                         </div>
						  
                      </div>
					
					  <div className="modal-footer">
					       <div className="alert alert-success" id="cancelSentFriendRequestSuccess">
                                  <strong>Success!</strong>Friend-request Cancelled Successfully
                           </div>
                           <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
					
                 </div>
      
               </div>
           </div>
		  
	<div className="row">
	 <div className="col-sm-12" className="friends_allFriendsBox">
	  <h3 style={{color: "#4b5bea"}}>Friends</h3>
      <div className="friends_allFriends" id="friends_friendlistall">
       <ul id="friends_friends" className="friends_friendli"></ul>
      </div>
	 </div>
	</div>
	
	<div className="friends_friendRequestBox">
	   <button type="button" className="btn btn-info" data-toggle="collapse" data-target="#friendRequests">See All Friend-requests</button>
       <div id="friendRequests" className="collapse">
         Friend request sent to you will be displayed here.
		 
		 <div id="friends_friendRequestsReceivedBox" className="friends_friendRequestsReceivedBox">
		 
		     <div className="row">
			  <ul id="friends_friendRequestsReceivedBoxlist" className="friends_friendRequestsReceivedBoxlist">
			 
			  
			     <li className="col-md-6 col-sm-6 col-xs-12"> Anusha </li>
			     <li className="col-md-6 col-sm-6 col-xs-12"> Abhilash </li>
			     <li className="col-md-6 col-sm-6 col-xs-12"> Anusha </li>
			     <li className="col-md-6 col-sm-6 col-xs-12"> Abhilash </li>
			  
			  
			  </ul>
			  <div className="alert alert-success" id="acceptReceivedFriendRequestSuccess">
                    <strong>Success!</strong>Friend-request Accepted successfully!
              </div>
			  <div className="alert alert-success" id="deleteReceivedFriendRequestSuccess">
                    <strong>Success!</strong>Friend-request deleted successfully!
              </div>
			 </div>
			 
		 </div>
		 
       </div>
	 </div>
	
	
  </div>

 
 )}
}

export default Friends



