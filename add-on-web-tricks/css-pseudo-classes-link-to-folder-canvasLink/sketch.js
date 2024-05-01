function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);
}

function draw() {

  text("clicking the canvas also links to the other page 🌲", 10, height/2)
  //
}

function mousePressed(){
  
  // the if statement covers the entire canvas
  // otherwise clicking anywhere on the entire WEBSITE
  // would link us to the other page
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    // window.location.href = "garden/index.html";
    window.location.href = "garden";
  }
  
}