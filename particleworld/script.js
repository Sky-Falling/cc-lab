
let insect = [];
let insect_number = 10;
let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas");
  // generate particles
  for (let i = 0; i < 20; i++) {
    insect.push(new Insect(random(width), random(height)));
  }
}

function draw() {
  background(240);

  for (let i = particles.length - 1; i > 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.brightness < 50) {
      particles.splice(i, 1);
    }
    print(particles.length);
  }

  for (let i = 0; i < insect.length; i++) {
    let p = insect[i];
    p.checkbound();
    p.update();
    p.display();
  }

  if (insect.length == 0) {
    textSize(60);

    text("you win", width / 2, height / 2);
  }
}

class Insect {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;

    this.life = true;
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
  }

  checkbound() {
    if (this.x > width || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.speedY *= -1;
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  display() {
    push();
    translate(this.x, this.y);

    ellipse(0, 0, 30, 50);

    fill("black");
    circle(-10, -30, 10);
    line(-10, -30, -5, -23);
    circle(10, -30, 10);
    line(10, -30, 5, -23);
    noFill();

    fill("red");
    noStroke();
    circle(-6, -10, 7);
    circle(6, -10, 7);
    noFill();

    stroke("black");
    strokeWeight(3);
    arc(0, 0, 30, 5, 0, PI);
    arc(0, 8, 27, 5, 0, PI);
    arc(0, 15, 23, 5, 0, PI);
    pop();
  }

  isClicked() {
    if (dist(mouseX, mouseY, this.x, this.y) < 15) {
      this.life = false;
    }
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.growth_max = random(1, 6);
    this.radius_max = random(50, 200);
    this.radius = int(random(10, this.radius_max));
    this.brightness = random(100, 255);
    this.thickness = random(0.5, 1.5);
    this.growth = random(this.growth_max);
    this.start_radius = random(2 * PI);
    this.arc = random(PI / 5, PI / 2);
    this.start_radius_speed = random(0.05);
    this.color1 = random(255);
    this.color2 = this.color1 + random(-100, 100);
    this.color3 = this.color1 + random(-100, 100);
  }
  // methods (functions): particle's behaviors
  update() {
    this.radius += this.growth;
    this.brightness *= 0.985;
    this.start_radius += this.start_radius_speed;
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    noFill();
    strokeWeight(this.thickness);
    stroke(this.color1, this.color2, this.color3, this.brightness);

    arc(
      random(-1, 1),
      random(-1, 1),
      this.radius,
      this.radius,
      this.start_radius,
      this.start_radius + this.arc
    );
    pop();
  }
}

function mousePressed() {
  let NUM_OF_PARTICLES = random(60, 120);

  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }

  for (let i = insect.length - 1; i >= 0; i--) {
    let p = insect[i];
    p.isClicked();
    if (p.life == false) {
      insect.splice(i, 1);
    }
  }
}
