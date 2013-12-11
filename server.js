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
    return (KeysRooms.find({list: localStorage.keyRoom})).name;
  };

  Template.messagesList.user = function(){
      /*var username=document.cookie;
      var getCookieResult=username.split("nameForChatApp=");
      var clearedName = getCookieResult[1].split(";");
      Meteor.call("getCountMessages", function (error, result) {
              if (localStorage.id == undefined){
                  var id = Users.insert({
                    'name': clearedName[0],
                    'cont':  result,
                  });
                  Session.set("contadorUser", result);
                  localStorage.cont = result;
                  localStorage.id = id;
              }
      });
      
      var name = clearedName[0];
      localStorage.name = name;*/
      return 'mockName';
  };

  Template.messagesList.events({
      'keydown input#newtext' : function(event){
      if(event.which == 13){ //13 == Enter key event
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
      }
    },
    'click button#newmessage': function () {
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
