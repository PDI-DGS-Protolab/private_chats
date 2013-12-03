
if (Meteor.isClient) {
  

  Template.joinroom.events({
   'click button.centerButton': function () {
      var newUrl= document.getElementById('newUrl');
      if(newUrl.value != ''){
        if (localStorage.servers == null) {
            var servers =  new Array();
        }
        else {
            servers = JSON.parse(localStorage.servers);
        }
        arrayObj = {"server":newUrl.value};
        servers.push(arrayObj);
        localStorage.servers = JSON.stringify(servers);     
        Router.go('rooms');
      }  
    }
  });

  

}