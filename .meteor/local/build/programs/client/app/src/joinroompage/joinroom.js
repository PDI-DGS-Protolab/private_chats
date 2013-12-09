(function(){
if (Meteor.isClient) {
  

  Template.joinroom.events({
   'click button.centerButton': function () {
      var newUrl= document.getElementById('newUrl');
      var newName= document.getElementById('newName');
      if(newUrl.value != ''){
        if (localStorage.servers == null) {
            var servers =  new Array();
        }
        else {
            servers = JSON.parse(localStorage.servers);
        }
        arrayObj = {"serverName":newName.value,"server":newUrl.value};
        servers.push(arrayObj);
        localStorage.servers = JSON.stringify(servers);     
        Router.go('rooms');
      }  
    }
  });

  

}

})();
