//Only for having rooms id
Rooms = new Meteor.Collection('rooms');

Messages = new Meteor.Collection('messages');

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Rooms.find().count() == 0){
      Rooms.insert({"name":"Room 1"});
      Rooms.insert({"name":"Room 2"});
      Rooms.insert({"name":"Room pi"});
    }
  });
}