Rooms = new Meteor.Collection('rooms');

Messages = new Meteor.Collection('messages');


if (Meteor.isServer) {

  /*today=new Date();
  var rooms = [
    {name: 'Room 1', numtext: 3, last_activity: today.toDateString()},
    {name: 'Room 2', numtext: 0, last_activity: today.toDateString()},
    {name: 'Room 3', numtext: 0, last_activity: today.toDateString()},
  ];
  var messages = [
        {room: 'Room 1', author: 'Man 1', text: 'Hi there Woman 1!', time : Date.now()},
        {room: 'Room 1', author: 'Woman 1', text: 'Hey Man 1, how are you?', time : Date.now()},
        {room: 'Room 1', author: 'Man 1', text: 'Good thanks!', time : Date.now()},
      ];

  _.each(rooms, function(room) {
    Rooms.insert(room);
  });

  _.each(messages, function(message) {
    Messages.insert(message);
  });*/

} 