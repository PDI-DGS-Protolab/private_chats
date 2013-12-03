Router.map( function () {

  // Routing to the homepage
  this.route('homepage', {
    path: '/'
  });

  this.route('rooms', {
    path: 'rooms'
  });

  this.route('joinroom', {
    path: 'join-room'
  });
});