

if (Meteor.isClient) {


  Meteor.Router.add({
  '/': 'home',
  '/rooms/:id': function(id) {
    Session.set('currentRoomId', id);
    return 'room'
  }
});

  Template.rooms.helpers({
      rooms: function() { return Rooms.find({},{sort : {last_activity: 1}}); }
  });

  Template.room.room = function(){
    return Rooms.findOne(Session.get('currentRoomId'));
  };

  Template.room.messages = function(){
    var actRoom = Rooms.findOne(Session.get('currentRoomId'));
    var messag = Messages.find({room:actRoom._id},{sort : {time: -1}});
    return messag;
  };

  Template.rooms.events({
      'keydown input#newroom' : function(event){
      if(event.which == 13){ //13 == Enter key event
        var newRoom= document.getElementById('newroom');
        if(newRoom.value != ''){
          today=new Date();
          Rooms.insert({
            name:newRoom.value,
            numtext:0,
            last_activity: today.toDateString(),
          });
          document.getElementsByTagName('newroom').value = '';
          newRoom.value = '';
        }
      }
    },
    'click button#newroom': function () {
      var newRoom= document.getElementById('newroom');
        if(newRoom.value != ''){
          today=new Date();
          Rooms.insert({
            name:newRoom.value,
            numtext:0,
            last_activity: today.toDateString(),
          });
          document.getElementsByTagName('newroom').value = '';
          newRoom.value = '';
        }
    }
    ,
    'click .delRoom': function (e) {
      var actRoom = Rooms.findOne(Session.get('currentRoomId'));
      var newRoom = Rooms.findOne({ _id :e.currentTarget.id});
      var messf = Messages.findOne({room : newRoom._id});
      while(messf != null){
        Messages.remove(messf._id);
        messf = Messages.findOne({room : newRoom._id});
      }
      Rooms.remove(newRoom._id);
      
      if(newRoom.name == actRoom.name){
        page('/');
      }
        
    }
  });

  Template.room.events({
      'keydown input#newtext' : function(event){
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
    },
    'click button#newmessage': function () {
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
  });

}