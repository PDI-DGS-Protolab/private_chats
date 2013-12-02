
if (Meteor.isClient) {
  

  Template.joinroom.events({
     'click button.centerButton': function () {
        var newUrl= document.getElementById('newUrl');
        if(newUrl.value != ''){
          Rooms.insert({
            nameId:Session.get('currentUserId') ,
            url: newUrl.value
          });
          page('/rooms/'+Session.get('currentUserId'));
        }  
    }
  });

  

}