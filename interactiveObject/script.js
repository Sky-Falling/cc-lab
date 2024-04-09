let faces = [];
let numFaces = 4;
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  for (let i = 0; i < numFaces; i++) {
    faces.push(new Face(random(width), random(height)));
  }
}
function draw() {
  background(180);
  for (let i = 0; i < faces.length; i++) {
    faces[i].update();
    faces[i].display(); 
  }


  // turn everybody angry at certain time:
  
  // if(frameCount > 60){
  // if(millis() > 3000){   // 3 seconds (3000 millieconds)
  //   for (let i = 0; i < faces.length; i++) {
  //     faces[i].turnAngry();
  //   }
  // }
}


class Face {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.offsetX = 0;


    this.normalColor = color(220, 250, 90); //yellow 
    this.angryColor = color(255, 90, 29); // red  
    this.c = this.normalColor;  

    this.oscillationOffset = random(2*PI)
    this.speedFactor = random(0.01, 0.05);

    this.frameAtBirth = frameCount;  // <-------------------
    this.age = 0;  // <-------------------
  } 
  update() {
    this.offsetX = map(sin((frameCount+this.oscillationOffset) * this.speedFactor), -1, 1, -20, 20);
    
    this.age = frameCount - this.frameAtBirth;  // <-------------------
    if(this.age>400){this.turnAngry();}
  }

  display() {
    push();
    translate(this.x + this.offsetX, this.y);
    noStroke();

    fill(this.c); 
    circle(0, 0, 50);
    fill(0);
    circle(-10, -10, 5)
    circle(10, -10, 5)
    ellipse(0, 10, 8, 9)

    text(this.frameAtBirth, 10, 10)  // <-------------------
    text(this.age, 10, 20)  // <-------------------

    pop();
  }
  turnAngry(){
    this.c = this.angryColor; 
  }

}



function mousePressed(){
  // // turn everybody angry on click:
  // for (let i = 0; i < faces.length; i++) {
  //   faces[i].turnAngry();
  // }

  faces.push(new Face(mouseX, mouseY));


}