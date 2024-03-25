/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/





let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new FredDancer(600,600);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class FredDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    //..
    //..
    //..
    this.angle_ear = 0;
    this.angle_ear_speed = 0.02;
    this.r = 20;
    this.cita = 0;
    this.cita_speed = 5;
    this.oci ;

    this.angle_hand = -0.6;
    this.angle_hand_speed = 0.1;
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    if(this.angle_ear>0.3){this.angle_ear_speed*=-1;}
    else if(this.angle_ear<-0.1){this.angle_ear_speed*=-1;}
    this.angle_ear +=this.angle_ear_speed;
    
    if(this.angle_hand>0.6){this.angle_hand_speed*=-1;}
    else if(this.angle_hand <-0.6){this.angle_hand_speed*=-1;}
    this.angle_hand += this.angle_hand_speed;
    
    
    if(this.cita>180){this.cita_speed*=-1;
                }
    else if(this.cita<0){this.cita_speed*=-1;
                   }
                   this.cita+=this.cita_speed;
  
    if(this.cita<=20){this.oci = map(this.cita,0,20,-2,4);}
    else if(this.cita<=40){this.oci = map(this.cita,20,40,4,0);}
    else if(this.cita > 160){this.oci = map(this.cita,160,180,-2,4);}
    else if(this.cita > 140){this.oci = map(this.cita,140,160,4,0);}
    else{this.oci = 0;}
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
 

    // ******** //
    // ⬇️ draw your dancer from here ⬇️



    
   
    push();
  
    translate(this.x+this.r*cos(radians(this.cita)),this.y-this.r*sin(radians(this.cita)));
    
    strokeWeight(0.5);
    fill('#fef0caff');
    
    
    
      push();
    translate(-25,39)
    rotate(this.angle_hand);
  ellipse(0,0,45,17);
    pop();
  
    push();
    translate(25,39)
    rotate(this.angle_hand);
  ellipse(0,0,45,17);
    pop();//hand
  
    
    
    
    beginShape();
    curveVertex(-27,20);
    curveVertex(-27,20);
    
    curveVertex(-35,80);
  
    curveVertex(35,80);
    curveVertex(27,20);
    curveVertex(27,20);
    endShape();//outer part(yellow part) of the body
    
    strokeWeight(0.2);
    fill('white')
    beginShape();
    curveVertex(-10,20);
    curveVertex(-10,20);
    
    curveVertex(-20,50);
    
    curveVertex(-15,84.5);
  
    curveVertex(15,84.5);
    
    curveVertex(20,50);
    
    curveVertex(10,20);
    curveVertex(10,20);
    endShape();//inner part(white part) of the body
    
    //body
    
      strokeWeight(0.5);
    noFill();
      beginShape();
    curveVertex(-27,20);
    curveVertex(-27,20);
    
    curveVertex(-35,80);
  
    curveVertex(35,80);
    curveVertex(27,20);
    curveVertex(27,20);
    endShape();//make up for the covered part of the curve
  
    
    
    fill('#fef0caff');
  
    
    
    push();
    translate(-10,-40);
    rotate(-this.angle_ear);
    ellipse(0,0,17,40);
    strokeWeight(0.2);
    fill('white');
    ellipse(0,0,10,20);
    fill('#fef0caff');
    pop();
    
    
    push();
    translate(10,-40);
    rotate(this.angle_ear);
    ellipse(0,0,17,40);
     strokeWeight(0.2);
      fill('white');
    ellipse(0,0,10,20);
    fill('#fef0caff');
    pop();//ear
    
    
  strokeWeight(0.5);
    
    
    beginShape();
    curveVertex(0,-40);
     curveVertex(0,-40);
    curveVertex(-24,-30);
    curveVertex(-30,20);
    curveVertex(30,20);
    curveVertex(24,-30);
    curveVertex(0,-40);
    curveVertex(0,-40);
    endShape();
    fill('black')
    ellipse(-15,-5,5,8);
    ellipse(15,-5,5,8);//head
   
    fill('#fef0caff');
    
    
    line(-3,10,3,10);
    line(0,10,0,13);
    line(0,13,-2,15);
    line(0,13,2,15);//mouth
    
    
  
    
    push();
    translate(-27,68+this.oci)
    rotate(1.3);
  ellipse(0,0,43,23);
    fill('#f7f7f7');
       strokeWeight(0.2);
    ellipse(2.5,0,28,15);
       strokeWeight(0.5);
    pop();
    
     push();
    translate(27,68+this.oci)
    rotate(-1.3);
  ellipse(0,0,43,23);
      fill('#f7f7f7');
       strokeWeight(0.2);
    ellipse(-2.5,0,28,15);
       strokeWeight(0.5);
    pop();//foot
    
    
    noFill();
    
   // this.drawReferenceShapes()
    
    pop();
    
   

   


    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.


  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/