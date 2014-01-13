function checkEmail(email) {

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
      return false;
    }
    return true;
}

function inviteOne(emails){
  for (var i = 0; i < emails.length; i++) {
    Meteor.call("invitePeople",emails[i],Session.get("roomInvite"), function (error, result) {});
  }
  Router.go('rooms');
}

if (Meteor.isClient) {

    var emailsSelecteds = new Array();

   Template.guest.emailsUsers = function(){
      Meteor.call("emailsUsers", Meteor.user()._id, function (error, result) {
        console.log(result);
          Session.set("emails", result);
      });
      var usersEmails = new Array();
      if (Session.get("emails") != undefined) {
        for (var i = 0; i < Session.get("emails").length; i++) {
          usersEmails.push({"username":Session.get("emails")[i].username,"email":Session.get("emails")[i].emails[0].address,"id":Session.get("emails")[i]._id});
        }
      }
      return usersEmails;
  };


  Template.guest.events({

      'click button.inviteOneButton': function () {
        inviteOne(emailsSelecteds);
      },
      'click a.backButton': function () {
        Router.go('rooms');
      },
      'click input.emailsCheck' : function() {
        var aux = 'tr'+this.id;
        document.getElementById(this.id).checked = !document.getElementById(this.id).checked;
        if (document.getElementById(this.id).checked) {
          var index = emailsSelecteds.indexOf(this.id);
          if (index <= -1) {
              emailsSelecteds.push(this.id);
          }
          document.getElementById(aux).className="newspaper-a-checked";
        } else {
          var index = emailsSelecteds.indexOf(this.id);
          if (index > -1) {
              emailsSelecteds.splice(index, 1);
          }
          document.getElementById(aux).className="newspaper-a";
        }
      },
      'click td.itemLine': function() {
          var aux = 'tr'+this.id;
          document.getElementById(this.id).checked = !document.getElementById(this.id).checked;
          if (document.getElementById(this.id).checked) {
            var index = emailsSelecteds.indexOf(this.id);
            if (index <= -1) {
                emailsSelecteds.push(this.id);
            }
            document.getElementById(aux).className="newspaper-a-checked";
          } else {
            var index = emailsSelecteds.indexOf(this.id);
            if (index > -1) {
                emailsSelecteds.splice(index, 1);
            }
            document.getElementById(aux).className="newspaper-a";
          }
      }
  });
}