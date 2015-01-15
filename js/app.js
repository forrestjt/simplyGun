// app.js
function start(){
  sjs.open();
  var ship = new sjs.Image('img/fighter1.png', 150, 100);
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
