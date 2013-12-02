
if (Meteor.isClient) {
  

  Template.joinroom.events({
     'click button#joinRoom': function () {
        var newUrl= document.getElementById('newUrl');
        if(newName.value != ''){
          Rooms.insert({
            nameId: 'id',
            url: newUrl.value
          });
        }
        page('/rooms/'+Session.get('currentUserId'));
    }
  });

  

}