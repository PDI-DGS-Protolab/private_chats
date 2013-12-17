Router.map( function () {

  this.route('messagesList', {
    path: '/room/:_room',
    action: function(){

      var params = this.params;
      var keyUser = this.params.user;
      var keyRoom = this.params.roomAuth;
      //TODO : uncomment 12-34 when authserver part is ready
      //TODO : check fullURL 

    //   var fullURL='http://localhost:3000'+'/check?user='+keyUser+'?roomAuth'+keyRoom;

    //   Meteor.call('remoteGet',fullURL,{}, function (error, result) {
        
    //     if(error) {
    //       window.alert("Can not conect to the server");
    //       console.log(error);
    //     } else {
    //       key = result.content;
    //       if(key != ''){
    //         localStorage.name = key.value;
    //         localStorage.keyRoom = this.params._room;
    //          if (KeysRooms.find({_id: params._room}).count() == 0) {
    //           this.render('roomNotFound');
    //           this.stop();
    //         }
    //       }
    //       else {
    //         //show ACCESS DENIED page
    //       }
    //       }
    //   });
    // },

   data: function () {
     var params = this.params;
     if (params.userName != '' && params.userName != null) {
       localStorage.name = params.userName;
     }
     localStorage.keyRoom = this.params._room;
     if (KeysRooms.find({_id: params._room}).count() == 0) {
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