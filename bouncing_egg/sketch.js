let basket = [];


function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);

  basket[0] = new Egg(random(width),random(height));
  basket[1] = new Egg(random(width),random(height));

}

function draw() {
  background(120, 90, 230);
   
  for(let i = 0; i<basket.length;i++)
  {
    basket[i].update();
    basket[i].display()

  }
}


function mousePressed(){
let newEgg = new Egg(mouseX,mouseY);
basket.push(newEgg);


}


class Egg{

constructor(startX,startY){


this.x = startX;
this.y = startY;
this.speedX = random(-2,2);
this.speedY = random(-2,2);
this.scale = random(1);
}


display(){
  push();
  translate(this.x,this.y);
  scale(this.scale);
    noStroke();
    fill(255, 200);
    arc(0, 0, 80, 80, 0, PI);
    fill('yellow')
    arc(0, 0, 80, 130, PI, 2*PI);
  
  pop();
}



update(){

if(this.x>width||this.x<0){this.speedX *=-1;}
if(this.y>height||this.y<0){this.speedY *=-1;}
this.x+=this.speedX;
this.y+=this.speedY;


}


}