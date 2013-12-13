if (Meteor.isClient) {

  console.log("here comes the cliente GUEST");

  Template.guest.events({
      'click button.centerButton': function () {
        var newName= document.getElementById('invited');
        var names = newName.value.replace(/ /g,"");
        names = names.split(',');
        Meteor.call("invitePeople",names,Session.get("roomInvite"), function (error, result) {
                console.log(result);
                console.log(error);
        });
      },
      'click a.backButton': function () {
        Router.go('rooms');
      }

  });
}