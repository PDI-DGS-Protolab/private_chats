(function(){Router.map( function () {

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

      console.log(Session.get("DeleteNoLogout"));
      if (!Session.get("DeleteNoLogout")){
        console.log(Session.get("DeleteNoLogout"));
        if (!Meteor.user()) {
          console.log("adeuu");
          this.render('login');
          this.stop();
        }
      } else {
        console.log("olaaa");
        console.log(Session.get("DeleteNoLogout"));
        //Session.set('DeleteNoLogout', null)
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

  this.route('null', {
    path: 'check',
    where: 'server',
    action: function () {
      var keyUser = this.params.ku;
      var keyRoom = this.params.kr;
      this.response.setHeader('Content-Type', 'application/json');
      if(Rights.find({user_id: keyUser, room_id: keyRoom}).count() > 0) {
        this.response.end(Meteor.users.findOne({_id: keyUser}).username);
      }
      else {
        this.response.end();
      }
    }
  })
});

Router.configure({
  notFoundTemplate: 'notfound',
  loadingTemplate: 'loading'
});

})();
