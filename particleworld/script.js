

let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas")
}

function draw() {
  background(240);

  // update and display
  for (let i = particles.length-1; i > 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if(p.brightness<40){particles.splice(i,1);}
    print(particles.length);
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.growth_max = random(1,6);
    this.radius_max = random(50,200);
    this.radius = int(random(10,this.radius_max));
    this.brightness = random(100,255);
    this.thickness = random(0.5,1.5);
    this.growth = random(this.growth_max);
    this.start_radius = random(2*PI);
    this.arc = random(PI/5,PI/2);
    this.start_radius_speed = random(0.05);
    this.color1 = random(255);
    this.color2 = this.color1+ random(-100,100);
    this.color3 = this.color1+ random(-100,100);
  }
  // methods (functions): particle's behaviors
  update() {
this.radius += this.growth;
this.brightness *=0.985;
this.start_radius += this.start_radius_speed;


}  


  
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    noFill();
    strokeWeight(this.thickness);
    stroke(this.color1,this.color2,this.color3,this.brightness);
 
    arc(random(-1,1),random(-1,1),this.radius,this.radius,this.start_radius,this.start_radius+this.arc);
    pop();
  }
}


function mousePressed(){
  let NUM_OF_PARTICLES = random(50,100); 
  
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(mouseX,mouseY));
  }
  
  
}
