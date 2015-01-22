// app.js
function start(){
  var sg = window.sg = {objects: {}};
  sg.me = {};
  sg.gun = Gun(location + 'gun');
  var game = window.game = sg.gun.load("game");
  sg.inup = function(i){
    var form = $(i);
    var username = sg.me.username = form.find('.username').val();
    var password = sg.me.password = form.find('.password').val();

    console.log(username, password);

    sg.gun.load('username/' + username).blank(function(){ // this only gets called if the username doesn't exist.
      sg.gun.set({username: username }) // registering the user!
        .key("username/" + username)
        .key('checkpassword/' + username + '/' + password);
      alert("Registered! Please Re-Log-In");

      //window.location = window.location;
    }).get(function(val){
      sg.gun.load('checkpassword/' + username + '/' + password).blank(function(){
        alert("wrong password or user already taken");
      }).get(function(user){
        alert("you logged in!");
        joinGame(user);
      });
    });
  }

  sjs.open("target");
  var bg = new sjs.Image('img/bg.png', sjs.width, sjs.height);
  sjs.keyDown(RIGHT_KEY, function(){
    sg.me.ship.pushRight();
    sg.update(sg.me.ship);
  });
  sjs.keyDown(LEFT_KEY, function(){
    sg.me.ship.pushLeft();
    sg.update(sg.me.ship);
  });
  sjs.keyDown(UP_KEY, function(){
    sg.me.ship.pushUp();
    sg.update(sg.me.ship);
  });
  sjs.keyDown(DOWN_KEY, function(){
    sg.me.ship.pushDown();
    sg.update(sg.me.ship);
  });

  sjs.makeStage("login");
  var login = new sjs.Button("Log In", function(){
    sjs.setStage("default");
  }).center();

  function joinGame(user){
    $("#interface").hide();
    sjs.setStage('default');

    user = user || {};
    user.x = user.x || 0;
    user.y = user.y || 0;
    user.sx = user.sx || 0;
    user.sy = user.sy || 0;

    var set = {};
    set[sg.me.username] = user;

    if(sg.objects[sg.me.username]){
      sg.me.ship = window.ship = sg.objects[sg.me.username];
    } else {
      sg.me.ship = window.ship = sg.objects[sg.me.username] = new sjs.Image('img/fighter1.png', 150, 100);
    }

    sg.gun.load('username/' + sg.me.username).set(user);
    game.path('players').set(set);

  };

  sg.update = function(ship){
    game.path('players.' + sg.me.username).set({x: ship.x, y: ship.y, sx: ship.sx, sy: ship.sy});
  }

  game.path('players').on(function(){
    game.path('players').map(function(player, username){
      if(sg.objects[username]){ return }
      console.log('player joined', username, player);

      var stage = sjs.stage;
      sjs.setStage('default');
      sg.objects[username] = new sjs.Image('img/fighter1.png', 150, 100);
      sjs.setStage(stage);

      this.on(function(play){
        //console.log('player moving', gid, play);
        sg.objects[username].sx = play.sx;
        sg.objects[username].sy = play.sy;
        if(play.y) sg.objects[username].y = play.y;
        if(play.x) sg.objects[username].x = play.x;
      })
    });
  });
}
