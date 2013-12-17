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
    path: 'rooms',
    before: function () {
      if (!Meteor.user()) {
        this.render('login');
        this.stop();
      }
    }
  });

  this.route('guest', {
    path: 'guest',
    before: function () {
      if (!Meteor.user()) {
        this.render('login');
        this.stop();
      }
    }
  });

  this.route('joinroom', {
    path: 'join-room',
    before: function () {
      if (!Meteor.user()) {
        this.render('login');
        this.stop();
      }
    }
  });

  this.route('createroom', {
    path: 'create-room',
    before: function () {
      if (!Meteor.user()) {
        this.render('login');
        this.stop();
      }
    }
  });
});