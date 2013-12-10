
if (Meteor.isClient) {
  

  Template.createroom.events({
   'click button.centerButton': function () {
      var newUrl= document.getElementById('newUrl');
      var newName= document.getElementById('newName');
      // window.location.href = "/newRoom?"+newUrl;
      var key="";
      var fullURL="http://"+newUrl.value+"/newRoom?newName="+newName.value;


      Meteor.call('remoteGet',fullURL,{}, function (error, result) {
      if(error) {
        console.log('http get FAILED!');
      } else {
        console.log('http get SUCCES');
      if (result.statusCode === 200) {
        console.log('Status code = 200!');
        console.log(result.content);

      }
}
});

      if(newUrl.value != ''){
        if (localStorage.servers == null) {
            var servers =  new Array();
        }
        else {
            servers = JSON.parse(localStorage.servers);
        }
        arrayObj = {"serverName":newName.value,"server":key.value};
        servers.push(arrayObj);
        localStorage.servers = JSON.stringify(servers);     
        //Router.go('rooms');
      }  
    }
  });

  

}