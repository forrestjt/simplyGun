// app.js
function start(){
  var gun = window.gun = Gun(location + 'gun').load("game");
  sjs.open("target", 1000, 700);
  var bg = new sjs.Image('img/bg.png', 1000, 700);
  var mark = window.mark = {entity:{}}, ship;

  var join = new sjs.Button("Join Game", function(){
    var gid = Gun.roulette();
    var set = {};
    set[gid] = {sx: 0, sy: 0};
    ship = window.ship = mark.entity[gid] = new sjs.Image('img/fighter1.png', 150, 100);
    ship.gid = gid;

    ship.sync = gun.path('players').set(set); //gun.path('players').path(id).set({x:0, y:0});

  }).bottom().right();

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

  /*
  sjs.keyUp(RIGHT_KEY, function(){
    ship.pushRight();
    mark.log(ship);
  });
  sjs.keyUp(LEFT_KEY, function(){
    ship.pushLeft();
    mark.log(ship);
  });
  sjs.keyUp(UP_KEY, function(){
    ship.pushUp();
    mark.log(ship);
  });
  sjs.keyUp(DOWN_KEY, function(){
    ship.pushDown();
    mark.log(ship);
  });*/

  mark.log = function(ship){
    //console.log.apply(console, arguments);
    gun.path('players.' + ship.gid).set({sx: ship.sx, sy: ship.sy});
  }

  gun.path('players').on(function(){
    gun.path('players').map(function(player, gid){
      if(mark.entity[gid]){ return }
      //console.log('player joined', gid, player);
      mark.entity[gid] = new sjs.Image('img/fighter1.png', 150, 100);
      this.on(function(play){
        //console.log('player moving', gid, play);
        mark.entity[gid].sx = play.sx;
        mark.entity[gid].sy = play.sy;
      })
    });
  });
}
