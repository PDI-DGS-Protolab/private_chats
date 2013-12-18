Router.map( function () {

  // Routing to the homepage
  this.route('login', {
    path: '/'
  });

  this.route('signup', {
    path: 'signup'
  });

  this.route('forgotpassword',{
    path: 'forgotpassword/:key',
    action: function() {
      _key = this.params.key;
      if (_key != null) {
        sessionStorage.PrivChatsRstPass = _key;
      }
      this.render();
    }
  });

  this.route('forgotpassword',{
    path: 'forgotpassword',
    action: function() {
      sessionStorage.removeItem('PrivChatsRstPass');
      this.render();
    }
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