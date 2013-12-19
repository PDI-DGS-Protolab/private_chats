if (Meteor.isClient) {

  Template.messagesList.helpers({
      messagesList: function() { return Messages.find({},{sort :{cont: 1}}); }
  });

  Template.messagesList.messages = function(){
    var actRoom = sessionStorage.key;
    return Messages.find({room: actRoom},{sort : {cont: 1}});
  };

  Template.messagesList.roomName =  function () {
   /* Meteor.call('getRoomName', function (error, result) {
      if(error) {
        return "ERROR";
      } else {
        return result;
      }
    });*/
    return sessionStorage.roomName;
    //console.log(KeysRooms.find({_id: sessionStorage.key}));
    //return KeysRooms.findOne({_id: sessionStorage.key}).name;
  };

  setSessionAndId = function(){
    Meteor.call("getCountMessages", function (error, result) {
      if (localStorage.id == undefined){
        var id = Users.insert({
          'name': clearedName[0],
          'cont':  result,
        });
        Session.set("contadorUser", result);
        localStorage.id = id;
      }
    });
  };

  Template.messagesList.user = function(e){
    return sessionStorage.name;
  };

  resolveClick = function () {
    var newName = sessionStorage.name;
    var actRoom = sessionStorage.key;
    var newText = document.getElementById('newtext');
    var contador = Messages.find({room: actRoom},{sort : {cont: 1}}).count();
    Meteor.call("getServerTime", function (error, result) {
          Session.set("time", result);
    });
    if(newName != '' && newText.value != ''){
      Messages.insert({
        author: newName,
        text: newText.value,
        time: Session.get("time"),
        cont: contador,
        room: actRoom,
      });
      document.getElementsByTagName('newtext').value = '';
      newText.value = '';
    }
  };

  Template.messagesList.events({
      'keydown input#newtext' : function(event){
      if(event.which == 13){ //13 == Enter key event
        resolveClick();
      }
    },
    'click button#newmessage': function () {
      resolveClick();
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  // server-side publish
Meteor.publish('UserCont', function (user_id) {
  if (someServerMethodThatValidatesUserId(user_id))
    // publish a single user object to the client
    return Users.find({_id: user_id});
});

  Meteor.methods({
    getServerTime: function () {
        return (new Date).toTimeString();
    },
    getCountMessages: function () {
        return Messages.find({},{sort : {cont: 1}}).count();
    },
    getUser : function(id){
      return Users.findOne({_id:id});
    },
    'remoteGet' : function(url,options){
      return HTTP.get(url,options);
    },
    'getRoomName' : function () {
      return KeysRooms.findOne({_id: sessionStorage.key}).name;
    }
  });
}
