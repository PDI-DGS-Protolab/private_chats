
if (Meteor.isClient) {
  

  Template.rooms.user=function(){
      return Users.findOne(Session.get('currentUserId'));
  };

  Template.rooms.events({
    'click button.joinButton': function(){

      page('/join-room/'+Session.get('currentUserId'));

    }
  });

  

}