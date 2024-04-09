
let confettis = [];
let numConfetti = 10;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");
  
  colorMode(HSB);

  for(let i = 0; i < numConfetti; i++){
    confettis.push(new Confetti(width/2, height/2))
  }
  
  background_color = color(random(255),10,190);

}

function draw() {
  background(background_color);

 
  
}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);   
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;

    this.speedY +=0.1;

  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(255, 0, 0);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }

}


function mousePressed(){


  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].display();
  }

}