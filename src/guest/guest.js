function checkEmail(email) {

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
      return false;
    }
    return true;
}

function inviteOne(){
  var newMail= document.getElementById('invited');
  var mailValue = newMail.value;
  Session.set('newEmail',mailValue);
  if(!checkEmail(newMail)){
    document.getElementById('errorMessage').innerHTML = 'Please enter a correct email address';
    document.getElementById('invited').value = null;
  }
  else{
    Meteor.call("checkEmailInUsers", mailValue, function (error, result) {
      Session.set('userExistance',result);
    });
    if(Session.get('userExistance')){
      Meteor.call("invitePeople",mailValue,Session.get("roomInvite"), function (error, result) {
      });
    }
    else{
      document.getElementById('errorMessage').innerHTML = 'This email are not registered yet';
      document.getElementById('invited').value = null;
    }
  }
}

if (Meteor.isClient) {

  console.log("here comes the cliente GUEST");

  Template.guest.events({
      'click button.inviteOneButton': function () {
        inviteOne();
        if(Session.get('userExistance')){
          Router.go('rooms');
        }
        Session.set('userExistance',false);
      },
      'click button.inviteMoreButton': function () {
        inviteOne();
        if(Session.get('userExistance')){
          document.getElementById('invited').value = null;
          document.getElementById('errorMessage').innerHTML = '';
          document.getElementById('successMessage').innerHTML = Session.get('newEmail')+' inserted in '+Session.get("roomInvite");
        }
        Session.set('userExistance',false);
      },
      'click a.backButton': function () {
        Router.go('rooms');
      }

  });
}