if (Meteor.isClient) {

  // $(document).ready(function () {
  //   if (localStorage.name != null) {
  //     document.location.href = document.location.href + 'rooms';
  //   };
  // });

  Template.homepage.rendered = function () {
    if (localStorage.name != null) {
      document.location.href = document.location.href + 'rooms';
    }
  };

  Template.homepage.events({
      'click button.centerButton': function () {
        var newName= document.getElementById('username');
        if(newName.value != ''){
          localStorage.name = newName.value;
          document.location.href = document.location.href + 'rooms';
        }
      }
  });
}