
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
          document.location.href = document.location.href + 'join-room';
      }  
    
  });

  

}