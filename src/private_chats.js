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

  Meteor.publish("userReady", function () {
    return Meteor.users.find({_id: this.userId},{fields: {'profile': 1}});
  });


  Meteor.publish("roomsUser", function() {
    console.log("roomsUser");
    if (this.userId) {
      console.log("userId no null");
      return Rights.find({user_id:this.userId},{});
    }
    return null;
  });
  
  Meteor.publish("myRooms", function () {
    var rooms = Rights.find({ user_id: this.userId }).fetch();
    var ids = new Array();
    rooms.forEach( function( entry ) {
      ids.push(entry.room_id);
    });
    return Rooms.find({_id: { $in: ids } }, { fields: { room_id: 0 } });
  });

  Meteor.methods({
    'remoteGet' : function(url,options){
      return HTTP.get(url,options);
    },
    'addNewRoom' : function (key, newName, newUrl, keyUser) {
          var x =  Rooms.insert({
            url: newUrl,
            name: newName,
            room_id: key,
            userOwner: keyUser,
          });
          Rights.insert({
            user_id: keyUser,
            room_id: x,
          });
          return x;
    },
    'getRooms' : function(){
        return Rooms.find();
    },
    'invitePeople' : function(nameId, room) {
          var res;
          if(nameId != '') {
              //TINDRIEM QUE CONSULTAR SI EXSISTEIX EL USER
              res = Rights.insert({
                user_id: nameId,
                room_id: room,
              });
          }
          return res;
      },
    'getRoomIdAuth': function(roomUrl, roomId) {
      var room = Rooms.find(
        { 
          url: roomUrl,
          room_id:roomId
        } 
      ).fetch();

      return JSON.stringify(room);
    },
    'deleteRoom': function(roomId, userId) {
      if(Rooms.find({_id:roomId, userOwner:userId},{}).fetch().length == 1) {
        Rooms.remove({_id:roomId});
        Rights.remove({room_id:roomId});
      } else {
        var tmp = Rights.find({room_id:roomId, user_id:userId}).fetch();
        Rights.remove({room_id:roomId, user_id:userId});
        return tmp;
      }
    },
    'checkEmailInUsers': function(email){
        var size=Meteor.users.find().count();
        var check=-1;
        var users=Meteor.users.find().fetch();
        var mail;
        for(var i=0;i<size;++i){

          mail=users[i].emails[0].address;
          if(mail==email){
            check = i;
          }
        }
        if(check!=-1){
          return users[check]._id;
        }
        else{
         return null;
        }
      },
      'checkEmailAllreadyInRoom' : function(userid,roomid){
        var right=Rights.find({user_id:userid, room_id:roomid}).count();
        if(right == 0){
          return false;
        }
        return true;
      },
      'getRoomUrl' : function(roomToken) {
        var room = Rooms.findOne({_id: roomToken});
        return room.url;
      },
      'emailsUsers' : function() {
        return Meteor.users.find({_id:{$ne:this.userId}}).fetch();
     }
  });
}

