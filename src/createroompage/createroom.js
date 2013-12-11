
if (Meteor.isClient) {
  

  Template.createroom.events({
   'click button.centerButton': function () {
      var newUrl= document.getElementById('newUrl');
      var newName= document.getElementById('newName');
      // window.location.href = "/newRoom?"+newUrl;
      var key="";
      var fullURL="http://"+newUrl.value+"/newRoom?newName="+newName.value;


      Meteor.call('remoteGet',fullURL,{}, function (error, result) {
        
        if(error) {
          console.log('http get FAILED!');
          console.log(error);
        } else {
          key = result.content;
          var roomUrl = newUrl.value + "/room/" + key;
          if(key != ''){
            if (localStorage.servers == null) {
              var servers =  new Array();
              console.alert("This room exists on the server");
            }
            else {
              servers = JSON.parse(localStorage.servers);
            }
            arrayObj = {"serverName":newName.value,"server":roomUrl};
            servers.push(arrayObj);
            localStorage.servers = JSON.stringify(servers);     
            Router.go('rooms');
          }  
        }
      });
    }
  });

}