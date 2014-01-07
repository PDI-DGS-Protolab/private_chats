(function(){if (Meteor.isClient) {

  Template.signup.events({
    'click button.centerButton': function () {
      var _username = document.getElementById('username').value;
      var _fullname = document.getElementById('fullname').value;
      var _email    = document.getElementById('email').value;
      var _password = document.getElementById('userpass').value;

      Accounts.createUser({username: _username, email: _email,
                           password : _password, profile: {fullname: _fullname}}, function(err){
        if (err) {
          // Inform the user that account creation failed
          if (err.reason == "Username already exists.") {
            document.getElementById('username').value = null;
            document.getElementById('username').placeholder = "User " + _username
            + " already exists, try other username";
          }
          else if (err.reason == "Email already exists.") {
            document.getElementById('email').value = null;
            document.getElementById('email').placeholder = _email
            + " is used. Did you forget your password?";
          }
          else {
            alert(err.reason);
          }
        }
        else {
          Router.go('rooms');
        }
      });
    }
  });
}

})();
