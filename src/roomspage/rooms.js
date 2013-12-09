
if (Meteor.isClient) {
  


  Template.rooms.user=function(){
      return localStorage.name;
  };

  Template.rooms.rooms=function(){
      if (localStorage.servers == null) return  new Array();
      else return JSON.parse(localStorage.servers);
  };


  
  Template.rooms.events({
     'click button.joinButton': function () {      
        Router.go('joinroom');
      },

      'click a.backButton': function () {
        localStorage.removeItem('name');
        Router.go('homepage');
      },
      'click a.urlRoom': function (e) {
        var url = e.currentTarget.id;
        var urlDomain = url.split(".");
        var resUrl;
        if(urlDomain[2]==undefined){//not going to a subdomain
          console.log("domain");
          var noPath=urlDomain[1].split("/");
          resUrl=urlDomain[0]+"."+noPath[0];

        }
        else{//going to a subdomain; ex:*.domain.com
          console.log("subdomain");
          var noPath=urlDomain[2].split("/");
          resUrl="."+urlDomain[1]+"."+noPath[0];
        }
        
        document.cookie = "nameForChatApp=" + localStorage.name + ";domain="+resUrl+";path=/";             
        window.location.href = "http://"+url;
      },
      'click a.nameRoom': function (e) {
        var url = e.currentTarget.id;
        var urlDomain = url.split(".");
        var resUrl;
        if(urlDomain[2]==undefined){//not going to a subdomain
          console.log("domain");
          var noPath=urlDomain[1].split("/");
          resUrl=urlDomain[0]+"."+noPath[0];

        }
        else{//going to a subdomain; ex:*.domain.com
          console.log("subdomain");
          var noPath=urlDomain[2].split("/");
          resUrl="."+urlDomain[1]+"."+noPath[0];
        }
        
        document.cookie = "nameForChatApp=" + localStorage.name + ";domain="+resUrl+";path=/";             
        window.location.href = "http://"+url;
      },
      'click button.delRoom':function(e){
        var servers = JSON.parse(localStorage.servers);
        var url = e.currentTarget.id;
        var newServers =  new Array();

        for(var i =0;i<servers.length;i++){
          if(servers[i].server!==url){
            newServers.push(servers[i]);
          }
        }
        localStorage.servers = JSON.stringify(newServers);
        location.reload(true);
        //Router.go('joinroom');
        //Router.go('rooms');
      }
  });

  

}