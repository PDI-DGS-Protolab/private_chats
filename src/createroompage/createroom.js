if (Meteor.isClient) {

  Template.createroom.events({
   'click button.centerButton': function () {      
      var newUrl= document.getElementById('newUrl');
      var newName= document.getElementById('newName');
      var key = "";
      var fullURL="http://"+newUrl.value+"/newRoom?newName="+newName.value;

      Meteor.call('remoteGet',fullURL,{}, function (error, result) {
        if(error) {
          window.alert("Can not conect to the server");
          console.log(error);
        } else {
          key = result.content;
          var roomUrl = newUrl.value + "/room/" + key;
          if(key != '' && key.length < 20){
            AddRoom(key,newName,roomUrl,Meteor.user()._id);
            Router.go('guest');
          }
          else {            
              window.alert("Ups!\nThe room " + newName.value + " can't be created");
          }
        }
      });

    }
  });

 function AddRoom(key,newName,roomUrl,user_id) {
      Meteor.call("addNewRoom",key,newName.value,roomUrl,user_id, function (error, result) {
            Session.set("roomInvite", result);
      });
  };
}
