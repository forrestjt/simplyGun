// app.js
function start(){
<<<<<<< HEAD
  sjs.open();
  var mark = {entity:{}}, ship;
  var join = new sjs.Button("Join Game", function(){
    ship = mark.entity['1'] = new sjs.Image('img/fighter1.png', 150, 100);
  }).bottom().right();
  sjs.keyDown(RIGHT_KEY, function(){
=======
  sjs.open("target", 1000, 700);
  var bg = new sjs.Image('img/bg.png', 1000, 700);
  var ship = new sjs.Image('img/fighter1.png', 100, 70);
  sjs.keyDown(RIGHT_KEY, function(){ 
>>>>>>> b37da1a0b0d239fe6674bb1da27f057c76b8e6c6
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
}
