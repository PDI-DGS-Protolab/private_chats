(function(){if (Meteor.isClient) {

  Template.login.rendered = function () {
    if (Meteor.user() != null) {     
      Router.go('rooms');
    }
  };

  Template.login.events({
    'click button.centerButton': function () {
      var _username = document.getElementById('username').value;
      var _password = document.getElementById('userpass').value;
      Meteor.loginWithPassword(_username, _password, function(err){
        if (err) {
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed.
          
          //document.getElementById('username').value = null;
          document.getElementById('errorMessage').innerHTML = 'Error: Invalid username/email or password';
          //document.getElementById('userpass').value = null;
          //document.getElementById('userpass').placeholder = 'Or wrong passwword';
        }
        else {
          Router.go('rooms');
        }          
      });
    },
    'click div.signupButton': function () {
      // Code for this click
    },
    'click div.forgotButton': function () {
      alert('Not implemented yet');
    }
  });
}

})();
