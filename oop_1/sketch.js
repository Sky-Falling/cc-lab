let instance;
let instance2;
let angle = 0;


function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvasContainer");
  instance = new Taxi(50,200,1);
  instance2 = new Taxi(200,200,2);
}

function draw() {
  background(90, 120, 250);
  instance.update();
  instance.display();

  instance2.update();
  instance2.display();
}


class Taxi{

 constructor(startX,startY,s){

  this.x = startX;
  this.y = startY;
  this.s = s;
  this.speedX = random(-2,2);
 }

 display(){

   push();
   translate(this.x,this.y);
   scale(this.s);
       // base:
       rect(-50, -50, 100, 30);
       // top"
       rect(-25, -70, 50, 20);


       this.drawWheel(-30,-15);
       this.drawWheel(30,-15);

       fill('red');
       circle(0,0,5);
       pop();
 }

  drawWheel(x, y){
  push();
  translate(x, y);
  rotate( radians(angle) );
  
    noStroke();
    fill(0);
    // circle(0,0,30);
    ellipse(0, 0, 28, 32)
  
  pop();
}


update(){

this.x+=this.speedX;
if(this.x>this.width+50){
  this.x = -50;
}
else if(this.x<-50){this.x = width+50;}
}


}


