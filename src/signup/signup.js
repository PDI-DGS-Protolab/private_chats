if (Meteor.isClient) {

  Template.signup.events({
    'click button.centerButton': function () {
      var _username = document.getElementById('username').value;
      var _fullname = document.getElementById('fullname').value;
      var _email    = document.getElementById('email').value;
      var _password = document.getElementById('userpass').value;
 /*     if (_username == null || _username == '') {
        document.getElementById('username').placeholder = 'Enter a valid username'; 
        return;
      }
      if (_fullname == null || _fullname == '') {
        document.getElementById('fullname').placeholder = 'Enter a valid full name'; 
        return;
      }
      if (_password != document.getElementById('checkuserpass').value) {
        document.getElementById('userpass').value = null;
        document.getElementById('checkuserpass').value = null;
        return;
      }*/
      Accounts.createUser({username: _username, email: _email,
                           password : _password, profile: {fullname: _fullname}}, function(err){
          if (err) {
            // Inform the user that account creation failed
            if (err.reason == "Username already exists.") {
              document.getElementById('username').value = null;
              document.getElementById('username').placeholder = "User " + _username
              + " already exists, try other username";
            }
          } else {
            Router.go('rooms');
          }

        });
    }
  });
}