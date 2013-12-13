if (Meteor.isClient) {

  Template.login.events({
    'click button.centerButton': function () {
      var newName= document.getElementById('username');
      if(newName.value != ''){
        localStorage.name = newName.value; 
        Router.go('rooms');
      }
    }
  });
}