let mode = 1; //there are 3 mode: day, loading and night
let b = 1;
let interval_y = 1;
//for the loading part

let step = 0; //the step of one firework
let number = 10; //the number of layers
let index = 0; //the index of layer

let speed_hanabi = 5; //the highest speed of the spread of the firework
let speed = speed_hanabi; //the ongoing speed of firework
let r1 = 5; //I forget what is its usage
let array = []; //the array to store each layer
var hanabi_x = 400;
var hanabi_y = 100; //

let location_y_pre = 0;
//above are for the firework

let shape = 32; // the higher the number, the higher the degree of crook(within a period)
let density = 9; //from 0 to 9
let oci = 10;
//The above  parameter can be changed.

let a = 1;
let Scale_sky;
let y = 0;
let x;
let brightness_sky = 255;
let galaxy_x;
let galaxy_y;
//The above part is to control the galaxy

let thickness_max = 1; //the thickest radius of the branch
let speed_oci; //seperation speed
let speed_oci_max = 0.3; //the horizontal speed of the devision of new born branches
let tree_color = "brown"; //the color of the tree
let time_limit = 4000; // the time limit that a plant can grow
let decay = 0.1; //this determine how fast the radius, v and other factors of the worm tree will decrease with time
let maxVal = 10;
let threshould = 0.995; //the highest death rate of worm tree
let t;
let Scale;
let x0 = 0;
let y0 = 0;
let len_max = 12;

let radius;
let brightness;
let counter = 0;
let plant = [];
let len = 0;
let t0 = 0;
let oci_max = 1.25;
let deathrate_limit = 0.9;

let radius_max = 10;
var speed_max;
//the above part is for the plant

function setup() {
  let cnv= createCanvas(800, 500);
  cnv.parent("p5-canvas-container");

  background("rgb(237,155,169)");
  stroke(173, 45, 45);

  speed_max = radius_max * random(0.15, 0.2);
  shape += random(-0.25, 0);

  for (let i = 0; i < number; i++) {
    array[i] = [];
    array[i][0] = (i + 1) / 4;
    array[i][1] = color(random(255), random(255), random(255));
    array[i][2] = random(0.4, 10);
    array[i][3] = array[i][2] * random(0.01, 0.05);
  }

  noStroke();
  let noiseScale = 0.01;
  for (let i = 0; i < width; i += 2) {
    for (let j = 0; j < height; j += 2) {
      if (dist(i, j, 700, 100) > 50) {
        noiseScale = 0.01;
      } else {
        noiseScale = 0.05;
      }
      const noiseVal = noise((i + width) * noiseScale, j * noiseScale);
      const currentColor = map(noiseVal, 0, 1, 0, 1);

      //fill('#FF0057');
      //circle(700,100,100);
      if (dist(i, j, 700, 100) > 50) {
        fill(130, 130 * currentColor, 15 * currentColor, 180);
      } else {
        fill(
          149 - 49 * currentColor,
          136 * currentColor,
          255 - 21 * currentColor
        );
      }

      rect(i, j, 2, 2);
    }
  } //sky texture part

  galaxy_x = random(200, 400);
  galaxy_y = 150 + random(-20, 20);
  while (millis() < 1500) {
    push();

    translate(galaxy_x, galaxy_y);
    brightness_sky -= 0.77;
    rotate(radians(shape * (10 - density) * a));
    Scale_sky = y / 400;
    scale(Scale_sky);

    strokeWeight(1.5);
    stroke(240 + random(-50, 0), 221 + random(-50, 0), 224, brightness_sky);
    line_modified(-25, y, 25, 15);

    y += 10 - density;
    a++;

    pop();
  } //galaxy part

  let star_color = [
    color(255, 210, 125, 255),
    color(166, 168, 255, 100),
    color(95, 56, 129, 150),
    color(255, 215, 215, 255),
  ];

  noStroke();

  for (let i = 0; i < 750; i = i + 1) {
    let a = random(width);
    let b = random(298);
    let c = random(1, 3);
    fill(star_color[floor(random(4))]);
    if (dist(a, b, 700, 100) > 50) {
      circle(a, b, c);
    }
  }
  //star part
  noStroke();
  fill(0, 58, 73); //sea color
  rect_modified(0, 300, 800, 200, 1); //draw see

  fill("rgb(151,123,71)");
  arc(600, 475, 710, 350, 0.5 * PI, 2 * PI); //the outer part of the island

  fill(105, 71, 13);
  arc(600, 475, 590, 350, 0.5 * PI, 2 * PI);
  rect(600, 300, 200, 200); //the inner part of the island
  
  
  strokeWeight(1);
  stroke('black');
      fill('black');
 text("Click on the beach", 270, 400);
  text("click 2 to night ", 270, 415);
  noStroke();
  noFill();
}

function draw() {
  colorMode(HSB);

  if (mode == 1) {
    //the plant part
    push();
    translate(x0, y0);

    Scale = (y0 - 275) / 400;

    scale(Scale);

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
      let location = 0;
      if (
        dist(mouseX, mouseY, 575, 500) < 240 ||
        (mouseX > 600 && mouseX < 800 && mouseY < 500 && mouseY > 300)
      ) {
        location = 1;
      }
      if (mouseIsPressed == 1 && location == 1 && mouseY >= 0) {
        x0 = mouseX;
        y0 = mouseY;
        location_y_pre = mouseY;
        tree_color = color(random(360), 100, 30);
        plant = [[0, 0, 0, speed_max, tree_color, 0]];
        len = 1;

        t0 = millis();
      }
    }

    pop();
  }
  //the above is for mode1 (sunny day)
  else if (mode == 2) {
    colorMode(RGB);
    t = millis();

    interval = map(a + b, 2, 20, 6, 10);
    distortion_y = random(-map(b, 1, 8, 0, 25), map(b, 1, 8, 0, 25));
    distortion_x = random(-map(b, 1, 8, 0, 15), map(b, 1, 8, 0, 15));
    stroke(random(255), random(255), random(255));
    component(75 * a, b * 70, interval_y * 50);

    if (a <= 9) {
      a++;
    } else {
      b += interval_y;
      a = 1;
      interval_y = interval_y * 0.9;
    }

    if (t - t0 > 2000) {
      mode = 3;
    }
  }
  //the above is the preparation for shifting part(mode 2)
  else {
    rect_modified(0, 0, width, height, 0); //the night sky

    colorMode(HSB);

    if (mouseIsPressed == true && t - t0 > 1500 && mouseY < 270) {
      number = random(5, 15);
      r1 = random(0.1, 3);
      speed_hanabi = random(3, 7);
      for (let i = 0; i < number; i++) {
        array[i] = [];
        array[i][0] = (i + 1) / 4;
        array[i][1] = color(random(360), random(100), 100);
        array[i][2] = random(0.4, 10);
        array[i][3] = array[i][2] * random(0.01, 0.05);
      }

      hanabi_x = mouseX;
      hanabi_y = mouseY;
      step = 0;
      speed = random(speed_hanabi * 0.5, speed_hanabi);
      r1 = 5;
      t0 = millis();
    }

    t = millis();

    noiseScale = 0.004;

    for (let i = 0; i < width; i += 2) {
      for (let j = 0; j < 300; j += 2) {
        const noiseVal = noise(
          (i + width) * noiseScale + t / 20000,
          j * noiseScale
        );

        if (noiseVal < 0.4) {
          fill(45, 75, 80 - noiseVal * 110);
          rect(i, j, 2, 2);
        }
      }
    }

    if (t - t0 <= 1500) {
      push();
      translate(hanabi_x, hanabi_y);

      scale(noise(hanabi_x, hanabi_y));

      for (let i = 0; i < number; i++) {
        array[i][1] = color(
          hue(array[i][1]),
          saturation(array[i][1]),
          100 - step * 1.5
        );
        hanabi(array[i][0], array[i][1], array[i][2], array[i][3]);
      }
      step = step + 1;
      index = 0;
      speed = speed * 0.96;
      r1 = r1 + speed;
      pop();
      //hanabi
    }

    colorMode(RGB);
    noStroke();
    let flashlight = 0;
    if (t - t0 <= 1500) {
      flashlight = map(noise(hanabi_x, hanabi_y), 0, 1, 0, 25);
    }

    fill(75 + flashlight, 0, 0); //sea color
    rect(0, 300, 800, 200); //draw sea

    fill("rgb(123,100,58)");
    arc(600, 475, 710, 350, 0.5 * PI, 2 * PI); //the outer part of the island

    fill("rgb(77,52,10)");
    arc(600, 475, 590, 350, 0.5 * PI, 2 * PI);
    rect(600, 300, 200, 200); //the inner part of the island
    //land and sea
    
     strokeWeight(1);
  stroke('black');
    fill('black');
     text("Click on the sky", 270, 400);
  text("click 1 to day ", 270, 415);
    noStroke();
    noFill();
  }

  //the above is mode 3(night sky)
}

function grow(i) {
  let a = random(1);
  let threshould2 = 15;

  fill(0, 0, 75);
  stroke(plant[i][4]);
  if (
    plant[i][5] < threshould2 &&
    a < threshould &&
    len < len_max - 1 &&
    t < time_limit
  ) {
    circle(plant[i][0], plant[i][1], radius);
    plant[i][1] -= plant[i][3];
    plant[i][0] -= plant[i][2];
    plant[i][5]++;
  } else if (
    plant[i][5] >= threshould2 &&
    a < threshould &&
    len < len_max - 1 &&
    t < time_limit
  ) {
    if (saturation(tree_color) > 30) {
      tree_color = color(hue(tree_color), saturation(tree_color) * 0.9, 40);
    }

    speed = map(
      radius,
      radius_max,
      radius_max * decay,
      speed_max,
      speed_max * 1.5 * decay
    );

    plant.push([
      plant[i][0],
      plant[i][1],
      plant[i][2] + random(speed_oci * 0.6, speed_oci),
      random(speed * 0.5, speed),
      tree_color,
      0,
    ]);
    plant.push([
      plant[i][0],
      plant[i][1],
      plant[i][2] - random(speed_oci * 0.6, speed_oci),
      random(speed * 0.5, speed),
      tree_color,
      0,
    ]);
    plant.splice(i, 1);
  } else {
    fill(plant[i][4]);
    circle(plant[i][0], plant[i][1], radius);
    noFill();
    plant.splice(i, 1);
  }
  len = plant.length;
}

function line_modified(x1, y1, x2, scale) {
  let t = 1;
  let x = x1;
  while (x < x2) {
    line(
      x,
      y1 + scale * noise(x * oci, y1),
      x + t,
      y1 + scale * noise((x + t) * oci, y1)
    );
    x = x + t;
  }
}

function rect_modified(x, y, a, b, want_wave) {
  colorMode(HSB);
  strokeWeight(1);
  for (let i = y; i <= y + b; i++) {
    if (want_wave == 1) {
      stroke(4, 67, 60 + (i - y) * 0.2);
    } else {
      stroke(45, 90, 20 + (i - y) * 0.1);
    }
    line(x, i, x + a, i);
  }

  if (want_wave == 1) {
    for (let i = 380; i <= 1000; i += 7) {
      let wave_brightness = map(i, 380, 550, 75, 100);
      stroke(350, 25, wave_brightness);
      push();
      translate(galaxy_x, 275);
      let new_y = i - 275;
      let new_x = -2000;
      Scale = new_y / 400;

      scale(Scale);
      while (new_x < 2000) {
        oci = 0.2;
        line_modified(new_x, new_y, new_x + random(7.5, 15), 1.7);
        new_x += random(20, 140);
      }
      pop();
    }
  }
  noStroke();
  colorMode(RGB);
}

function keyPressed() {
  if (key == "1") {
    window.location.reload();
  }
  if (key == "2") {
    mode = 2;
    t0 = millis();
    colorMode(RGB);
    background(255, 255, 255);
    a = 1;
    b = 1;
  }
}

function hanabi(r2, color, dense, length) {
  let cita = 0;
  while (cita < 360) {
    ranlen = noise(cita, index) * r1 * r2;
    r_revision = ranlen + r1;
    r_revision_end = r_revision + ranlen * length;

    stroke(color);
    strokeWeight(1);
    line(
      r_revision * sin(radians(cita)),
      r_revision * cos(radians(cita)),
      r_revision_end * sin(radians(cita)),
      r_revision_end * cos(radians(cita))
    );
    cita = cita + dense;
  }
  index = index + 1;
}

function component(center_x, center_y, r) {
  noFill();
  for (let radius = r; radius > 0; radius -= interval) {
    adj_y = map(center_y, 0, 800, 0, 70);
    adj_x = map(center_x, 0, 800, 0, 70);

    center_x_rev =
      center_x +
      (radius * adj_x * noise(center_x, center_y, radius)) / 100 +
      distortion_x;
    center_y_rev =
      center_y +
      (radius * adj_y * noise(center_x, center_y, radius)) / 100 +
      distortion_y;
    interval = interval * 0.9;

    circle(center_x_rev, center_y_rev, radius);
  }
}
//the component of the patter during loading process
