import React from 'react'

class Friends extends React.Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     data:"initial data",
  //   };
  //   this.viewMore=this.viewMore.bind(this);
  // }
  // viewMore(){this.setState({data:"updated data"})}

componentDidMount() {
     console.log('Component DID MOUNT!')
   
 
   $(document).ready(function(){
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

      var html = "<table border='1|1'>";
        for (var i = 0; i < data.length; i++) {
        html+="<tr>";
        html+="<td>"+data[i].firstname+"</td>";
        html+="<td><button id=btn1 >"+"Add"+"</button></td>";

       

        html+="</tr>";

    }
    html+="</table>";
      $("#suggestion-box").show();
      $("#suggestion-box").html(html);
      $("#btn1").click(function(){
        console.log("clicked");
      });
    }

    });
  });
});
  
   }
	
	
 render(){

   return (
   
   
  <div>
    <h2>Welcome to WebChat Friends page!!!</h2>
    <input type="search" id="searchnewfriends"/>
    <div id="suggestion-box">
    </div>
  </div>

 
 )}
}

export default Friends