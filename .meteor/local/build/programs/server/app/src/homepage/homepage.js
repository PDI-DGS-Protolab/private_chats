(function(){if (Meteor.isClient) {

  Template.homepage.rendered = function () {
    if (localStorage.name != null) {     
      Router.go('rooms');
    }
  };

  Template.homepage.events({
      'click button.centerButton': function () {
        var newName= document.getElementById('username');
        if(newName.value != ''){
          localStorage.name = newName.value;     
        Router.go('rooms');
        }
      }
  });
}

})();
