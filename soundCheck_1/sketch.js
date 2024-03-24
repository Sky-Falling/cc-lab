let kicksound;
function preload(){

kicksound = loadSound("sounds/kick.mp3");

}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);
}

function draw() {
circle(30,30,30);
}

function mousePressed(){

kicksound.play();

}