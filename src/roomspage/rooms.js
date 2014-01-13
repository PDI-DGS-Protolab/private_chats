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
        console.log("CLICK BOTO");
        var idRoom = e.currentTarget.id;
        Session.set("DeleteNoLogout",1);
        console.log(idRoom + "  " + Meteor.user()._id);
        Meteor.call("deleteRoom", idRoom, Meteor.user()._id, function(error, result) {
          console.log(result);
        });
      },
      'click button.addPeople':function(e){
        var idRoom = e.currentTarget.id;
        Session.set("roomInvite", idRoom);
        Router.go('guest');
      }
  });
}