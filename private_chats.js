

if (Meteor.isClient) {
  Meteor.Router.add({
  '/': 'homepage',
  '/rooms':'rooms',
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
