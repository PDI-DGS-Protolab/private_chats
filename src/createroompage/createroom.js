
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
        } else {
          key = result.content;
          console.log(key);
          var roomUrl = newUrl.value + "/room/" + key;
          console.log(roomUrl);
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
        }
      });
    }
  });

}