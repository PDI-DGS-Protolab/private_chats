if (Meteor.isClient) {

  Template.messagesList.helpers({
      messagesList: function() { return Messages.find({},{sort :{cont: 1}}); }
  });

  Template.messagesList.messages = function(){
    return Messages.find({},{sort : {cont: 1}});
  };

  Template.messagesList.user = function(){
      var username=document.cookie;
      var getCookieResult=username.split("nameForChatApp=");
      var clearedName = getCookieResult[1].split(";");
      var name = clearedName[0];
      localStorage.name = name;
      return name;
  };

  Template.messagesList.backButton=function(){
      return localStorage.serverBack;
  };

  Template.messagesList.events({
      'keydown input#newtext' : function(event){
      if(event.which == 13){ //13 == Enter key event
        var newName= localStorage.name;
        var newText= document.getElementById('newtext');
        var contador = Messages.find({},{sort : {cont: 1}}).count();
        Meteor.call("getServerTime", function (error, result) {
              Session.set("time", result);
        });
        if(newName != '' && newText.value != ''){
          Messages.insert({
            author: newName,
            text: newText.value,
            time: Session.get("time"),
            cont: contador,
          });
          document.getElementsByTagName('newtext').value = '';
          newText.value = '';
        }
      }
    },
    'click button#newmessage': function () {
        var newName= localStorage.name;
        var newText= document.getElementById('newtext');
        var contador = Messages.find({},{sort : {cont: 1}}).count();
        Meteor.call("getServerTime", function (error, result) {
              Session.set("time", result);
        });
        if(newName != '' && newText.value != ''){
          Messages.insert({
            author: newName,
            text: newText.value,
            time: Session.get("time"),
            cont: contador,
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

  Meteor.methods({
        getServerTime: function () {
            return (new Date).toTimeString();
        }
    });
}
