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
  $("#searchnewfriends").keyup(function(){
    $.ajax({
    type: "GET",
    url: "/friends",
    data:'keyword='+$(this).val(),
    // beforeSend: function(){
    //   $("#searchnewfriends").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
    // },
    success: function(data){
      console.log(data);
      var myNode = document.getElementById("suggestion-box");
      myNode.innerHTML = '';

    //   var html = "<table border='1|1'>";
    //     for (var i = 0; i < data.length; i++) {
    //     html+="<tr>";
    //     html+="<td>"+data[i].email+"</td>";
    //     html+="<td><button id="+data[i].email+" onclick="+self+".send >"+"Add"+"</button></td>";

       

    //     html+="</tr>";

    // }
    // html+="</table>";


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
                 document.getElementById("suggestion-box").appendChild(li);
        }
      


      $("#suggestion-box").show();
      // $("#suggestion-box").html(html);
      $("#btn1").click(function(){
        console.log("clicked");
      });
    }.bind(this)

    });
  });


//displaying friends
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
         // console.log(this.state.receiver);
         // li.addEventListener("click", function() { self.friendChat(this.id); }, false);
                 document.getElementById("friends").appendChild(li);
        }
      }
      
      
    }.bind(this)
   });











}.bind(this));
  
   }
  
  
 render(){

   return (
   
   
  <div className="main">
    <h2>Welcome to WebChat Friends page!</h2>
    <div className="rightbar">
        <h3>Search friends to add</h3>
        //<div className="imagearea">
         // <input type="image" id="f_image" src = " ../../images/friend.jpg" className="friends_image" /><br/>
        //</div>
        <div className="searchgrid">
          <input type="search" id="searchnewfriends"/>
          <div id="suggestion-box"></div>
        </div>
    </div>
    <div className="home_recentfriends" id="friendlistall">
       <ul id="friends" className="friendli"></ul>
    </div>
  </div>

 
 )}
}

export default Friends



