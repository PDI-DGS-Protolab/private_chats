
if (Meteor.isClient) {
  


  Template.rooms.user=function(){
      return localStorage.name;
  };

  Template.rooms.rooms=function(){
      if (localStorage.servers == null) return  new Array();
      else return JSON.parse(localStorage.servers);
  };

  Template.rooms.events({
     'click button.joinButton': function () {      
        Router.go('joinroom');
      },

      'click a.backButton': function () {
        localStorage.removeItem('name');
        Router.go('homepage');
      }
  });

  

}