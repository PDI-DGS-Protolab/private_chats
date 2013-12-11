if (Meteor.isClient) {
  //'path':'template'
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    'remoteGet' : function(url,options){
      return HTTP.get(url,options);
    }
  });
}
