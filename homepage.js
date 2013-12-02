if (Meteor.isClient) {


Template.homepage.events({
    'click button.centerButton': function () {
        var newName= document.getElementById('username');
        if(newName.value != ''){
          Users.insert({
            name: newName.value,
          }); 
        var user=Users.findOne({ name : newName.value});
        page('/rooms/'+user._id);
      }
    }
  });

}