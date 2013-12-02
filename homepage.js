if (Meteor.isClient) {


Template.homepage.events({
      /*'keydown input#newtext' : function(event){
      if(event.which == 13){ //13 == Enter key event
        var actRoom = Rooms.findOne(Session.get('currentRoomId'));
        today=new Date();
        var newName= document.getElementById('newname');
        var newText= document.getElementById('newtext');
        if(newName.value != '' && newText.value != ''){
          Messages.insert({
            room: actRoom._id,
            author: newName.value,
            text: newText.value,
            time: Date.now(),
          });
          Rooms.update(actRoom._id, {name: actRoom.name,numtext:actRoom.numtext+1,last_activity: today.toDateString()});
          document.getElementsByTagName('newtext').value = '';
          newText.value = '';
        }
      }
    },*/
    'click button.centerButton': function () {
        var newName= document.getElementById('username');
        if(newName.value != ''){
          Users.insert({
            name: newName.value,
          }); 
        var user=Users.findOne({ name : newName.value});
        page('/rooms/'+user._id);
      }
    }
  });

}