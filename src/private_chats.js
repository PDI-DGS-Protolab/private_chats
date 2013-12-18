if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Accounts.emailTemplates.resetPassword.text = function(user, url) {
      old_url = url;
      key = url.substring(url.lastIndexOf('/')+1);
      url = url.replace('#/reset-password', 'forgotpassword');
      return "Hello,\n" + "To reset your password, simply click the link below.\n"
             + url + "\nThanks.";
    };
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
          var x = 0;
          names.forEach(function(entry) {
            if(entry != '') {
              //TINDRIEM QUE CONSULTAR SI EXSISTEIX EL USER
              Rights.insert({
                user_id: entry,
                room_id: room,
              });
              x = x+1;
            }
          });
          return x;
      },
      'roomsUser' : function(id) {
        var rooms = Rights.find({user_id:id},{}).fetch();
        var myRooms = new Array();
        rooms.forEach(function(entry) {
          var room = Rooms.find({_id:entry.room_id}).fetch();
          myRooms.push(room[0]);
        });
        return myRooms;
      },
      'getRoomIdAuth' : function(roomUrl,roomId) {

        console.log(roomUrl);
        console.log(roomId);

        var room = Rooms.find(
          { 
            url: roomUrl,
            room_id:roomId
          } 
        ).fetch();

        console.log(JSON.stringify(room));
        return JSON.stringify(room);
      },
      'checkEmailInUsers': function(email){
        var size=Meteor.users.find().count();
        var check=false;
        var users=Meteor.users.find().fetch()
        var mail;
        for(var i=0;i<size;++i){

          mail=users[i].emails[0].address;
          if(mail==email){
            check = true;
          }
        }
        return check;
      },
  });
}

