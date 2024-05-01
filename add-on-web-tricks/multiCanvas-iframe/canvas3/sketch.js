function setup() {
  let canvas = createCanvas(700, 200);
  canvas.parent("canvasContainer");
  
}

function draw() {
  background(10, 255, 55);
  text("canvas 2 what what", 20, 40);
  fill(0);
  ellipse(mouseX, mouseY, 120, 80)
  //
}