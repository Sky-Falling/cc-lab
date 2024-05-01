function setup() {
  let canvas = createCanvas(300, 800);
  canvas.parent("canvasContainer");
  
}

function draw() {
  background(10, 190, 255);
  text("canvas 2 what what", 20, 40);
  fill(0);
  rect(mouseX-40, mouseY-40, 80, 80)
  //
}