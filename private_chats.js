

if (Meteor.isClient) {
  //'path':'template'
  Meteor.Router.add({
    '/': 'homepage',
    '/rooms/:id': function(id) {
     Session.set('currentUserId', id);
     return 'rooms' },
    '/join-room/:id': function(id) {
     Session.set('currentUserId', id);
     return 'joinroom' } ,
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
