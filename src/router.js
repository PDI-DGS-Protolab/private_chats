Router.map( function () {

  // Routing to the homepage
  this.route('login', {
    path: '/'
  });

  this.route('signup', {
    path: 'signup'
  });

  this.route('forgotpassword',{
  });

  this.route('rooms', {
    path: 'rooms'
  });

  this.route('guest', {
    path: 'guest'
  });

  this.route('joinroom', {
    path: 'join-room'
  });

  this.route('createroom', {
    path: 'create-room'
  });
});