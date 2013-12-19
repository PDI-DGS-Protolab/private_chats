
if (Meteor.isClient) {
  
  Template.rooms.user = function(){
    return Meteor.user().profile.fullname;
  };


  Template.rooms.rooms = function(){
      Meteor.call("roomsUser", Meteor.user()._id, function (error, result) {
          Session.set("salas", result);
      });
     return Session.get("salas");
  };
  


  goToUrl = function (e) {
    console.log(e.currentTarget);
    var idauth = e.currentTarget.id;
    var tuser = Meteor.user()._id;
    Meteor.call('getRoomUrl', idauth, function (error, result) {
      var fullUrl = 'http://' + result + '?usr=' + tuser + '&tok=' + idauth;
      window.location.href = fullUrl;
    });
  }

  var getSegment = function (url, index) {
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
        goToUrl(e);
      },
      'click button.delRoom':function(e){
        var idRoom = e.currentTarget.id;

        Meteor.call("deleteRoom",idRoom, Meteor.user()._id,function (error, result) {});
        location.reload(true);
      },
      'click button.addPeople':function(e){
        var idRoom = e.currentTarget.id;
        Session.set("roomInvite", idRoom);
        Router.go('guest');
      }
  });

  

}