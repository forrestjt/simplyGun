// app.js
function start(){
  var gun = window.gun = Gun(location + 'gun').load("game");
  sjs.open("target", 1000, 700);
  var bg = new sjs.Image('img/bg.png', 1000, 700);
  var mark = window.mark = {entity:{}}, ship;

  var join = new sjs.Button("Join Game", function(){
    var id = "players_" + Gun.roulette();
    gun.path(id).set({x:0, y:0});

    ship = mark.entity[id] = new sjs.Image('img/fighter1.png', 150, 100);
    ship.gid = id;
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
  mark.log = function(){ console.log.apply(console, arguments) }
  gun.on(function(game){
    console.log("WE HAVE NEW PLAYERS!!!", game);

  });
}
