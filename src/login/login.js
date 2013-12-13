if (Meteor.isClient) {

  Template.login.rendered = function () {
    if (localStorage.name != null) {     
      Router.go('rooms');
    }
  };

  Template.login.events({
    'click button.centerButton': function () {
      var newName= document.getElementById('username');
      if(newName.value != ''){
        localStorage.name = newName.value; 
        Router.go('rooms');
      }
    },
    'click div.signupButton': function () {
      // Code for this click
    },
    'click div.forgotButton': function () {
      alert('Not implemented yet');
    }
  });
}