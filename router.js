Router.map( function () {

  this.route('loading', {
    path: '/room/:_room',
    action: function() {
      Session.set('isLoading', true);
      this.render('loading');
      var user = this.params.usr;
      var keyRoom = this.params._room;
      var tokenAuth = this.params.tok;
      if (user != '' && user != null && keyRoom != null && tokenAuth != null) {
        sessionStorage.key = keyRoom;
      }
      else {
        this.render('roomNotFound');
        Session.set('isLoading', false);
        this.stop();
      }
      if (KeysRooms.find({_id: keyRoom}).count() == 0) {
        this.render('roomNotFound');
        Session.set('isLoading', false);
        this.stop();
      }

      Future = Npm.require('fibers/future');
      var myFuture = new Future();

      var ENDPOINT = 'http://authserver.meteor.com/check';
      var conect = ENDPOINT + '?ku=' + user + '&kr=' + tokenAuth;
      var ok = false;
      Meteor.call('remoteGet', conect, {}, function (error, result) {
        if(error) {
          window.alert("Can not conect to the server");
          console.log(error);
        } else {
          if (result == null || result.content == '') {
          }
          else {
            ok = true;
            sessionStorage.name = result.content;
          }
        }
        myFuture.return(result);
        Session.set('isLoading', false);
      });
      myFuture.wait();
      if (ok) this.render('messagesList');
      else this.render('roomNotFound');
    }
  });

  this.route('name', {
    path: '/newRoom',
    where: 'server',
    autorender: false,
    action: function () {
      var params = this.params;
      var _name = params.newName;
      var exist = KeysRooms.find({name: _name}).count();
      var _key;
      if (_name != '' && _name != null && exist == 0) {
        _key = KeysRooms.insert({name: _name});
      }
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(_key);
    }
  });

  this.route('roomNotFound', {
  });
});


Router.configure({
  notFoundTemplate: 'notfound',
  loadingTemplate: 'loading'
});