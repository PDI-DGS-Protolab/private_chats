if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    'remoteGet' : function(url,options){
      return HTTP.get(url,options);
    },
    'addNewRoom' : function (key, newName, newUrl, keyUser) {
          return Rooms.insert({
            url: newUrl,
            name: newName,
            room_id: key,
            userOwner: keyUser,
          });
      },
      'getRooms' : function(){
          return Rooms.find();
      },
      'invitePeople' : function(names,room) {
          names.forEach(function(entry) {
            if(entry != '') {
              //TINDRIEM QUE CONSULTAR SI EXSISTEIX EL USER
              Rights.insert({
                user_id: entry,
                room_id: room,
              });
            }
          });
      }
  });
}

