Router.map( function () {

  // Routing to the homepage
  this.route('login', {
    path: '/',
    before: function() {
      if(Meteor.user()) {
        this.redirect('rooms');
      }
    }
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
     waitOn: function() {
            return userDocHandle
        },

        onAfterRun: function() {
            if(!Meteor.user()) {
                this.render('login');
                this.stop();
            }
        }

  });

  this.route('guest', {
    path: 'guest',
    waitOn: function() {
            return userDocHandle
        },

        onAfterRun: function() {
            if(!Meteor.user()) {
                this.render('login');
                this.stop();
            }
        }
  });

  this.route('joinroom', {
    path: 'join-room',
    waitOn: function() {
            return userDocHandle
        },

        onAfterRun: function() {
            if(!Meteor.user()) {
                this.render('login');
                this.stop();
            }
        }
  });

  this.route('createroom', {
    path: 'create-room',
    waitOn: function() {
            return userDocHandle
        },

        onAfterRun: function() {
            if(!Meteor.user()) {
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
        console.log(Meteor.users.findOne({_id: keyUser}).username);
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

userDocHandle = {
    ready: function () {
        if(Meteor.user()) {
            return true;
        }
        return false;
    }
};

