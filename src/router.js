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

  this.route('check', {
    path: '/check',
    autorender: false,
    action: function () {
      var params = this.params;
      var keyUser = this.params.user;
      var keyRoom = this.params.roomAuth;
      var userName ='';
      //if has rights to enter -> respond with userName
      // if(Rights.find({user: keyUser, roomAuth: keyRoom}).count() != 0){
      //   this.response.setHeader('Content-Type', 'application/json');
      //   this.response.end(userName);
      // }
      // else{//if not -> respond with empty string
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end('Ola');
      //}
    }
  })

});