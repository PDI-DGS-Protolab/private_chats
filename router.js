Router.map( function () {

  this.route('messagesList', {
    path: '/room/:_room',
    before: function () {
      Session.set('isLoading', true);
      this.render();
    },
    action: function() {
      var user = this.params.usr;
      var keyRoom = this.params._room;
      var tokenAuth = this.params.tok;
      var ENDPOINT = Meteor.settings.public.endpoint;
      var conect = ENDPOINT + '/check?ku=' + user + '&kr=' + tokenAuth;

      if (user != '' && user != null && keyRoom != null && tokenAuth != null) {
        sessionStorage.key = keyRoom;
      }
      else {
        this.redirect('roomNotFound');
        return;
      }
      var calls = 0;
      var call1 = null;
      var call2 = null;
      Meteor.call('existsRoom', keyRoom, function (error, result) {
        if (error) {
          console.log(error);
        }
        else if (result != 0) {
          call1 = result;
        }

        if (++calls == 2) {
          if (call1 != null && call2 != null) {
            Session.set('isLoading', false);
          }
          else {
            Router.go('roomNotFound');
          }
        }
      });
      Meteor.call('remoteGet', conect, {}, function (error, result) {
        if(error) {
          window.alert("Can not conect to the server");
          console.log(error);
        } 
        else if (result != null && result.content != '') {
          sessionStorage.name = result.content;
          call2 = result.content;
        }

        if (++calls == 2) {
          if (call1 != null && call2 != null) {
            Session.set('isLoading', false);
          }
          else {
            Router.go('roomNotFound');
          }
        }
      });   
    },
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