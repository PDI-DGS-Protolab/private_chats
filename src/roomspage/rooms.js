
if (Meteor.isClient) {
  
  Template.rooms.user = function(){
    return Meteor.user().profile.fullname;
  };


  Template.rooms.rooms = function(){
     Meteor.call("roomsUser",Meteor.user()._id, function (error, result) {
          Session.set("salas", result);
      });
     return Session.get("salas");
  };


  resolveUrl = function (e) {
    var url = e.currentTarget.id + '?userName=' + localStorage.name;
    window.location.href = "http://"+url;
  }

  var getSegment = function (url, index) {
    return url.replace(/^https?:\/\//, '').split('/')[index];
  }

  
  Template.rooms.events({
     'click button.joinButton': function () {      
        Router.go('joinroom');
      },

      'click button.createButton': function () {      
        Router.go('createroom');
      },

      'click a.backButton': function () {
        localStorage.removeItem('name');
        Meteor.logout();
        Router.go('login');
      },
      'click a.urlRoom': function (e) {
        //resolveUrl(e);
        //TODO : properly assign user token authRoom parameters

        var roomIdChat =  getSegment(e.currentTarget.id,2);
        var roomURL =  e.currentTarget.id;
        var user =localStorage.getItem("Meteor.userId");//change to tokens

        var roomAuth ='roomAuth';//change to tokens

        Meteor.call('getRoomIdAuth', roomURL, roomIdChat, function (err,data){

          if(err){
            console.log(err);}
            else{
              Session.set('q',data);

             // console.log(data);
            }
         });

       console.log(Session.get('q'));
        var res=Session.get('q');
        //TODO : get _id from res and pass everything to chatServ (uncomment 68,69)
        console.log(res["_id"]);
        var roomAuth=res._id;
        //check if is working with IE
        //var url = e.currentTarget.id + '?user=' + user +'?roomAuth='+roomAuth;
       // window.location.href = "http://"+url;

      },
      'click a.nameRoom': function (e) {
        resolveUrl(e);
      },
      'click button.delRoom':function(e){
        var idRoom = e.currentTarget.id;

        Meteor.call("deleteRoom",idRoom, Meteor.user()._id,function (error, result) {});
        location.reload(true);
      }
  });

  

}