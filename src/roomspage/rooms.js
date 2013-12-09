
if (Meteor.isClient) {
  


  Template.rooms.user=function(){
      return localStorage.name;
  };

  Template.rooms.rooms=function(){
      if (localStorage.servers == null) return  new Array();
      else return JSON.parse(localStorage.servers);
  };

  Template.rooms.urls=function(){
    return Rooms.find();
  };
  Template.rooms.events({
     'click button.joinButton': function () {      
        Router.go('joinroom');
      },

      'click a.backButton': function () {
        localStorage.removeItem('name');
        Router.go('homepage');
      },
      'click button.delRoom':function(e){
        var servers = JSON.parse(localStorage.servers);
        var url = e.currentTarget.id;
        var newServers =  new Array();

        for(var i =0;i<servers.length;i++){
          if(servers[i].server!==url){
            newServers.push(servers[i]);
          }
        }
        localStorage.servers = JSON.stringify(newServers);
        location.reload(true);
        //Router.go('joinroom');
        //Router.go('rooms');
      }
  });

  

}