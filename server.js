if (Meteor.isClient) {

  Template.messagesList.helpers({
      messagesList: function() { return Messages.find({},{sort :{cont: 1}}); }
  });

  Template.messagesList.messages = function(){
    if (localStorage.id != undefined) {
      Meteor.call("getUser",localStorage.id, function (error, result) {
            Session.set("contadorUser", result.cont);
      }); 
    }
    var actRoom = localStorage.keyRoom;
    var num = Session.get("contadorUser");
    return Messages.find({cont: {$gt: num}, room: actRoom},{sort : {cont: 1}});
  };

  Template.messagesList.roomName =  function () {
    var n = (KeysRooms.find({_id: localStorage.keyRoom})).fetch();
    if (n[0].name == '') return 'Name not found';
    return n[0].name;
  };

  // Sets into the localstorege the name contained into the cookie
  getCookie =  function(e) {
    var username = document.cookie;
    var getCookieResult = username.split("nameForChatApp=");
    var clearedName = getCookieResult[1].split(";");
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
      
    var name = clearedName[0];
    localStorage.name = name;
    return name;
  };

  Template.messagesList.user = function(e){
    //getCookie(e);
    return localStorage.name;
  };

  resolveClick = function () {
    var newName= localStorage.name;
    var actRoom = localStorage.keyRoom;
    var newText= document.getElementById('newtext');
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
    }
  });
}
