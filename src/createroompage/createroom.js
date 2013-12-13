
if (Meteor.isClient) {
  console.log("here comes the cliente");
  

  Template.createroom.events({
   'click button.centerButton': function () {
      console.log("click button.centerButton");

      
      var newUrl= document.getElementById('newUrl');
      var newName= document.getElementById('newName');
      // window.location.href = "/newRoom?"+newUrl;
      var key="";
      var fullURL="http://"+newUrl.value+"/newRoom?newName="+newName.value;


      Meteor.call('remoteGet',fullURL,{}, function (error, result) {
        
        if(error) {
          window.alert("Can not conect to the server");
          console.log(error);
        } else {
          key = result.content;
          var roomUrl = newUrl.value + "/room/" + key;
          if(key != ''){
            if (localStorage.servers == null) {
              var servers =  new Array();
            }
            else {
              servers = JSON.parse(localStorage.servers);
            }
            arrayObj = {"serverName":newName.value,"server":roomUrl};
            servers.push(arrayObj);
            localStorage.servers = JSON.stringify(servers);     
            Router.go('rooms');
          }
          else {            
              window.alert("This room already exists on server\nUse other name or join it");
          }
        }
      });
    }
  });

}