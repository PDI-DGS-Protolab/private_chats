
if (Meteor.isClient) {
  
  Template.rooms.user = function(){
    return Meteor.user().profile.fullname;
  };

  Template.rooms.rooms=function(){
    if (localStorage.servers == null) return  new Array();
    else return JSON.parse(localStorage.servers);
  };

  resolveUrl = function (e) {
    var url = e.currentTarget.id + '?userName=' + localStorage.name;
    window.location.href = "http://"+url;
  }

  
  Template.rooms.events({
     'click button.joinButton': function () {      
        Router.go('joinroom');
      },

      'click button.createButton': function () {      
        Router.go('createroom');
      },

      'click a.backButton': function () {
        localStorage.removeItem('name');
        Meteor.logout();
        Router.go('login');
      },
      'click a.urlRoom': function (e) {
        resolveUrl(e);
      },
      'click a.nameRoom': function (e) {
        resolveUrl(e);
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