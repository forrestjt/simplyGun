// app.js
function start(){
  sjs.open("target", 1000, 700);
  var bg = new sjs.Image('img/bg.png', 1000, 700);
  var ship = new sjs.Image('img/fighter1.png', 100, 70);
  sjs.keyDown(RIGHT_KEY, function(){ 
     ship.pushRight();
  });
  sjs.keyDown(LEFT_KEY, function(){ 
     ship.pushLeft();
  });
  sjs.keyDown(UP_KEY, function(){
     ship.pushUp();
  });
  sjs.keyDown(DOWN_KEY, function(){
    ship.pushDown();
  });
}
