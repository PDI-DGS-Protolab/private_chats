if (Meteor.isClient) {

  

  Template.room.helpers({
      room: function() { return Messages.find({},{sort :{time: 1}}); }
  });

  Template.room.messages = function(){
    return Messages.find({room:Session.get('currentRoomId')},{sort : {time: 1}});
  };

  Template.room.info=function(){
      return Rooms.findOne(Session.get('currentRoomId'));
  };



  Template.room.events({
      'keydown input#newtext' : function(event){
      if(event.which == 13){ //13 == Enter key event

        var newName= localStorage.name;
        var newText= document.getElementById('newtext');
        if(newName.value != '' && newText.value != ''){
          Messages.insert({
            room: Session.get('currentRoomId'),
            author: newName,
            text: newText.value,
            time: Date.now(),
          });
          document.getElementsByTagName('newtext').value = '';
          newText.value = '';
        }
      }
    },
    'click button#newmessage': function () {
        var newName= localStorage.name;
        var newText= document.getElementById('newtext');
        if(newName.value != '' && newText.value != ''){
          Messages.insert({
            room: Session.get('currentRoomId'),
            author: newName,
            text: newText.value,
            time: Date.now(),
          }); 
          document.getElementsByTagName('newtext').value = '';
          newText.value = '';
      }
    }
  });

}