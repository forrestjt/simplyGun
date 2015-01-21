// app.js
function start(){
  var sg = window.sg = {};
  sg.inup = function(i){
    console.log(i);
  }

  sjs.open("target");
  var bg = new sjs.Image('img/bg.png', sjs.width, sjs.height);
  sjs.makeStage("login");
  var login = new sjs.Button("Log In", function(){
    sjs.setStage("default");
  }).center();

  var gun = window.gun = Gun(location + 'gun').load("game");
  var mark = window.mark = {entity:{}}, ship;


  /*
  var join = new sjs.Button("Join Game", function(){
    join.hide();
    var gid = Gun.roulette();
    var set = {};
    set[gid] = {sx: 0, sy: 0};
    ship = window.ship = mark.entity[gid] = new sjs.Image('img/fighter1.png', 150, 100);
    ship.gid = gid;

    ship.sync = gun.path('players').set(set); //gun.path('players').path(id).set({x:0, y:0});

  }).bottom().right();
  */

  sjs.keyDown(RIGHT_KEY, function(){
     ship.pushRight();
     mark.log(ship);
  });
  sjs.keyDown(LEFT_KEY, function(){
     ship.pushLeft();
     mark.log(ship);
  });
  sjs.keyDown(UP_KEY, function(){
     ship.pushUp();
     mark.log(ship);
  });
  sjs.keyDown(DOWN_KEY, function(){
    ship.pushDown();
    mark.log(ship);
  });


  mark.log = function(ship){
    gun.path('players.' + ship.gid).set({x: ship.x, y: ship.y, sx: ship.sx, sy: ship.sy});
  }

  gun.path('players').on(function(){
    gun.path('players').map(function(player, gid){
      if(mark.entity[gid]){ return }
      //console.log('player joined', gid, player);
      var stage = sjs.stage;
      sjs.setStage('default');
      mark.entity[gid] = new sjs.Image('img/fighter1.png', 150, 100);
      sjs.setStage(stage);

      this.on(function(play){
        //console.log('player moving', gid, play);
        mark.entity[gid].sx = play.sx;
        mark.entity[gid].sy = play.sy;
        if(play.y)mark.entity[gid].y = play.y;
        if(play.x)mark.entity[gid].x = play.x;
      })
    });
  });
}
