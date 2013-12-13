if (Meteor.isClient) {

  /*
    http://docs.meteor.com/#template_currentuser
    http://blog.benmcmahen.com/post/41741539120/building-a-customized-accounts-ui-for-meteor
  */
  Template.forgotpassword.events({
    'submit #recovery-form': function (e, t) {
      console.log('here comes the function');
      e.preventDefault();
      var _email = document.getElementById('username').value;
      if (_email != null) {
        Session.set('loading', true);
        Accounts.forgotPassword({email: _email}, function(err){
          if (err) {
            // Inform the user that account creation failed
            console.log(err.reason);
          }
          else {
            alert("An Email has been send to " + _email);
          }
          Session.set('loading', false);
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
      if (_password != '') {
        Session.set('loading', true);
        Accounts.resetPassword(Session.get('resetPassword'), _password, function(err){
          if (err)
            console.log(err.reason);
          else {
            Session.set('resetPassword', null);
          }
          Session.set('loading', false);
        });
      }
    }
  });

  Template.forgotpassword.helpers({
    resetPassword : function(t) {
      return Session.get('resetPassword');
    }
  });
}