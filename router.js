Router.map( function () {

  this.route('messagesList', {
    path: '/room/:_room',
    data: function () {
      var params = this.params;
      if (params.userName != '' && params.userName != null) {
        localStorage.name = params.userName;
      }
      localStorage.keyRoom = this.params._room;
      if (KeysRooms.find({_id: this.params._room}).count() == 0) {
        this.render('roomNotFound');
        this.stop();
      }
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
});