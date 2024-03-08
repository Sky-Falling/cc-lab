let thickness_max = 1;
let speed_oci; //seperation speed
let generation = 1;
let speed_oci_max = 0.5;
let tree_color = "black";
let time_limit = 5000;
let decay = 0.07;
let maxVal = 10;
let threshould = 0.99;
let t;

let radius;
let brightness;
let counter = 0;
let plant = [];
let len = 0;
let t0 = 0;
let oci_max = 0.7;
let deathrate_limit = 0.92;

let radius_max = 10;
var speed_max;

function setup() {
  let cnv= createCanvas(800, 500);
  cnv.parent("p5-canvas-container");
  background(220);
  stroke(173, 45, 45);
  speed_max = radius_max * random(0.15, 0.2);
}

function draw() {
  
  fill(255);
  for (let i = 0; i < len; i++) {
    t = millis() - t0;
    radius = map(t, 0, time_limit, radius_max, radius_max * decay);
    speed_oci = map(
      radius,
      radius_max,
      radius_max * decay,
      speed_oci_max,
      speed_oci_max * decay
    );
    ocillation = map(t, 0, time_limit, oci_max, oci_max * decay);
    brightness = map(t, 0, time_limit, 250, 200);
    thickness = map(t, 0, time_limit, thickness_max, thickness_max * decay);

    threshould = map(t, 0, time_limit, 1, deathrate_limit);
    strokeWeight(thickness);
    plant[i][0] += random(-ocillation, ocillation);

    grow(i);


    }
      if (t > time_limit || len > maxVal || len == 0) {
     
      if(mouseIsPressed==1){x0 = mouseX;
      y0 = mouseY;
      plant = [[x0, y0, 0, speed_max, "black", 0]];
      len = 1;
      t0 = millis();}
  }
}

function grow(i) {
  let a = random(1);
  let threshould2 = random(25, 35);
  stroke(plant[i][4]);
  if (plant[i][5] < threshould2 && a < threshould) {
    circle(plant[i][0], plant[i][1], radius);
    plant[i][1] -= plant[i][3];
    plant[i][0] -= plant[i][2];
    plant[i][5]++;
  } else if (plant[i][5] >= threshould2 && a < threshould) {
    stroke(173, 45, 45, brightness);
    speed = map(
      radius,
      radius_max,
      radius_max * decay,
      speed_max,
      speed_max * decay
    );

    plant.push([
      plant[i][0],
      plant[i][1],
      plant[i][2] + random(speed_oci * 0.5, speed_oci),
      random(speed * 0.5, speed),
      color(random(100,255), 0, 0),
      0,
    ]);
    plant.push([
      plant[i][0],
      plant[i][1],
      plant[i][2] - random(speed_oci * 0.5, speed_oci),
      random(speed * 0.5, speed),
      color(random(100,255), 0, 0),
      0,
    ]);
    plant.splice(i, 1);
  } else {
    plant.splice(i, 1);
  }
  len = plant.length;
}
