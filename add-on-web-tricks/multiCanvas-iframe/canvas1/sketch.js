function setup() {
  let canvas = createCanvas(500, 300);
  canvas.parent("canvasContainer");
  
}

function draw() {
  background(220, 30, 255);
  text("canvas 1 what what", 20, 40);
  //
  fill(0);
  circle(mouseX, mouseY, 80)
}