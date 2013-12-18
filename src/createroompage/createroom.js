
if (Meteor.isClient) {

  Template.createroom.events({
   'click button.centerButton': function () {      
      var newUrl= document.getElementById('newUrl');
      var newName= document.getElementById('newName');
      // window.location.href = "/newRoom?"+newUrl;
      var key = "";
      var fullURL="http://"+newUrl.value+"/newRoom?newName="+newName.value;

      Meteor.call('remoteGet',fullURL,{}, function (error, result) {
        if(error) {
          window.alert("Can not conect to the server");
          console.log(error);
        } else {
          key = result.content;
          var roomUrl = newUrl.value + "/room/" + key;
          if(key != ''){
            //modificar localStore por el token user;
            AddRoom(key,newName,roomUrl,Meteor.user()._id);
            Router.go('guest');
          }
          else {            
              window.alert("This room already exists on server\nUse other name or join it");
          }
        }
      });
    }
  });

 function AddRoom(key,newName,roomUrl,user_id) {
      //console.log(key);
      //console.log(newName.value);
      //console.log(roomUrl);
      //console.log(user_id);
      Meteor.call("addNewRoom",key,newName.value,roomUrl,user_id, function (error, result) {
            Session.set("roomInvite", result);
      });
  };
}
