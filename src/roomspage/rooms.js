if (Meteor.isClient) {

  var subscription;
  
  Template.rooms.user = function () {
    return Meteor.user().profile.fullname;
  };

  Template.rooms.imOwner = function (userID) {
    return Meteor.user()._id == userID;
  };

  Template.rooms.rooms = function () {
    subscription.ready();
    return Rooms.find().fetch();
  };

  Template.rooms.created = function () {
    subscription = Meteor.subscribe("myRooms");
  };
  
  goToUrl = function (tok_Rooms) {
    var tuser = Meteor.user()._id;
    Meteor.call('getRoomUrl', tok_Rooms, function (error, result) {
      var fullUrl = 'http://' + result + '?usr=' + tuser + '&tok=' + tok_Rooms;
      window.location.href = fullUrl;
    });
  }

  getSegment = function (url, index) {
    return url.replace(/^https?:\/\//, '').split('/')[index];
  }
  
  Template.rooms.events({
     'click button.joinButton': function () {      
        Router.go('joinroom');
      },

      'click button.createButton': function () {      
        Router.go('createroom');
      },

      'click a.backButton': function () {
        localStorage.removeItem('name');
        Meteor.logout();
        Router.go('login');
      },
      'click div.divTextRoom' : function(e) {
        goToUrl(e.currentTarget.id);
      },
      'click button.delRoom':function(e){
        var idRoom = e.currentTarget.id;
        delsubs = Meteor.subscribe("roomDeleted");
        Meteor.call("deleteRoom", idRoom, Meteor.user()._id, function(error, result) {
        });
        console.log("READY go");
        delsubs.ready();
        location.reload(true);
        console.log("READY ok");
      },
      'click button.addPeople':function(e){
        var idRoom = e.currentTarget.id;
        Session.set("roomInvite", idRoom);
        Router.go('guest');
      }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'deleteRoom': function(roomId, userId) {
      if(Rooms.find({_id:roomId, userOwner:userId},{}).fetch().length == 1) {
        Rooms.remove({_id:roomId});
        Rights.remove({room_id:roomId});
      }
      else {
        Rights.remove({room_id:roomId, user_id:userId});
      }

      Meteor.publish("roomDeleted", function () {
        return Meteor.users.find({_id: this.userId},{fields: {'profile': 1}});
      });
    },
  });
}