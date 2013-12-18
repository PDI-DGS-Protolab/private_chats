if (Meteor.isClient) {
  Template.forgotpassword.events({
    'submit #recovery-form': function (e, t) {
      e.preventDefault();
      var _email = document.getElementById('username').value;
      if (_email != null) {
        //Accounts.sendResetPasswordEmail(_email);
        Accounts.forgotPassword({email: _email}, function(err){
          if (err) {
            alert(err.reason);
          }
          else {
            alert("An Email has been send to " + _email +
                  "\nFollow the instructions");
          }
        });
      }
    },

    'submit #new-password' : function(e, t) {
      e.preventDefault();
      var _password = document.getElementById('userpass').value;
      if (_password != document.getElementById('repuserpass').value) {
        document.getElementById('userpass').value = null;
        document.getElementById('repuserpass').value = null;
        document.getElementById('userpass').placeholder = "The passwords do not match";
        return;
      }
      _key = sessionStorage.PrivChatsRstPass;
      sessionStorage.removeItem('PrivChatsRstPass');
      if (_password != '') {
        Accounts.resetPassword(_key, _password, function(err){
          if (err) {
            console.log(_key + " is not valid");
            Router.go('login');
          }
          else {
            Router.go('rooms');
          }
        });
      }
    }
  });

  Template.forgotpassword.helpers({
    resetPassword: function (t) {
      return sessionStorage.PrivChatsRstPass != null;
    }
  });

}