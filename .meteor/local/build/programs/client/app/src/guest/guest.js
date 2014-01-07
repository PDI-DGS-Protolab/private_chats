(function(){function checkEmail(email) {

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
      return false;
    }
    return true;
}

function inviteOne(exit){
  var newMail= document.getElementById('invited');
  var mailValue = newMail.value;
  if(!checkEmail(newMail)){
    document.getElementById('successMessage').innerHTML = '';
    document.getElementById('errorMessage').innerHTML = 'Please enter a correct email address';
    document.getElementById('invited').value = null;
  }
  else{
    Meteor.call("checkEmailInUsers", mailValue, function (error, result) {
      if(result!=null){
        var result2 = result;
        Meteor.call("checkEmailAllreadyInRoom", result, Session.get("roomInvite") , function (error, result) {
          if(!result){  
            Meteor.call("invitePeople",result2,Session.get("roomInvite"), function (error, result) {
            });
            if(exit){
              Router.go('rooms');
            }
            else{
              document.getElementById('invited').value = null;
              document.getElementById('errorMessage').innerHTML = '';
              document.getElementById('successMessage').innerHTML = mailValue+' can now enter to your chat room';
            }
          }
          else{
            document.getElementById('errorMessage').innerHTML = mailValue+' allready in this room';
            document.getElementById('successMessage').innerHTML = '';
          }
        });
      }
      else{
            document.getElementById('successMessage').innerHTML = '';
            document.getElementById('errorMessage').innerHTML = 'This email are not registered yet';
            document.getElementById('invited').value = null;
      }
    });
  }
}

if (Meteor.isClient) {

  console.log("here comes the cliente GUEST");

  Template.guest.events({
      'click button.inviteOneButton': function () {
        inviteOne(true);
      },
      'click button.inviteMoreButton': function () {
        inviteOne(false);

      },
      'click a.backButton': function () {
        Router.go('rooms');
      }

  });
}

})();
