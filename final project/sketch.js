let speedX = 0;
let targetSpeedX = 0;
let latestNewKeyPress;
let building_size = 400;
let dayLength = 30000;
let weather = 0;
let state = 'ongoing';
let foods = [];
let score = 0;
let food_size = 50;
function preload() {
  

  tree2 = loadImage('tree2.png');
  tree1 = loadImage('tree1.png');
  car = loadImage('car.png');
  house1 = loadImage("house1.jpg");
  house2 = loadImage("house2.png");
  house3 = loadImage("house3.png");
  house4 = loadImage("house4.png");
  house5 = loadImage("house5.png");
  house = [house1, house2, house3, house4, house5];
  school1 = loadImage("school1.png");
  city = loadImage("city1.png");
  hospital = loadImage("hospital1.jpg");
  day = loadImage("day.png");
  night = loadImage("night.jpg");
  road = loadImage("road3.jpg");
  cat_left = loadImage("character_left.png");
  cat_right = loadImage("character_right.png");


  blueberry = loadImage('blueberry.jpg');
  boiled_chicken_breast =  loadImage('boiled chicken breast.jpg');
  cat_grass = loadImage('cat grass.jpg');
  cooked_egg_yolk = loadImage('cooked egg yolk.jpg');
  cooked_pumpkin = loadImage('cooked pumpkin.jpg');
  potato = loadImage('potato.jpg');
  rice = loadImage('rice.jpg');




 salmon = loadImage('cooked salmon.jpg');
 cucumber = loadImage('cucumber.jpg');
 chicken = loadImage('freeze-dry chicken.jpg');

 avacado = loadImage('avacado.jpg');
 cookie = loadImage('cookie.jpg');
 grape = loadImage('grape.jpg');
 milk = loadImage('milk.png');
 egg = loadImage('raw egg.jpg');

 BBQ_chicken = loadImage('BBQ_chicken.png');
 corn= loadImage('corn.png');
 flavored_can = loadImage('flavored_can.png');
 fried_snacks = loadImage('fried_snacks.png');
 tomato =loadImage('tomato.png');
 chocolate = loadImage('chocolate.png');
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("canvasContainer");
  streetline = 0.618 * height;


  healthy_foods = [salmon,cucumber,chicken,  blueberry, boiled_chicken_breast ,cat_grass, cooked_egg_yolk ,cooked_pumpkin, potato, rice];
  unhealthy_foods = [avacado,cookie,grape,milk,egg,BBQ,_chicken, corn ,flavored_can, fried_snacks ,tomato ,chocolate];

   
  for(let i = 0 ; i<healthy_foods.length;i++){
    foods.push(new Food(healthy_foods[i],true));
  }
  
  for(let i = 0 ; i<unhealthy_foods.length;i++){
    foods.push(new Food(unhealthy_foods[i],false));
  }

  city.resize(1200, 0);
  tree2.resize(200,0);
  house1.resize(building_size, 0);
  house2.resize(building_size, 0);
  house3.resize(building_size, 0);
  house4.resize(building_size, 0);
  house5.resize(building_size, 0);
  school1.resize(building_size, 0);
  hospital.resize(building_size, 0);
  road.resize(building_size, height * (1 - 0.618));
  car.resize(300,0);
  day.resize(width, 0);
  night.resize(width,0);

  cat_left.resize(100, 0);
  cat_right.resize(100, 0);

  for(let i = 1; i<healthy_foods.length;i++){

    healthy_foods[i].resize(food_size,0);
  }

  for(let i = 0; i<unhealthy_foods.length;i++){

    unhealthy_foods[i].resize(food_size,0);
  }

  stars = new Stars();


  buildings = [];
  let pre = 10000;
  for (let i = 0; i < 100; i++) {
    buildings.push(new Building(pre));
    pre = buildings[i].x;
  }
  character = new Cat();
  cars = [];

  character.interaction = false;

}



function draw() {

  if(score==9){state = 'win';}

  switch (state){
    case 'ongoing': ongoing();
    break;
    case 'fail': fail();
      break;
    case 'win': win();
    break;
  }

}

function win(){


  background('green');
  
  textAlign(CENTER);
  textSize(60);
  text('You win',width/2,height/3);

}

class Food{
  constructor(FOOD,HEALTHY){

    this.x = random(-800,800);
    let p = random(1);
      if(p<0.75) {this.y = random(streetline,580);} 
      else{this.y = random(700,height);}
    
   
    this.food = FOOD;
    this.healthy = HEALTHY; 
    this.state = true;
  }

  detect(){
    if( key== "1"){character.interaction = true;

    }
    else{character.interaction = false;}
    if(character.interaction == true&&this.state==true&&dist(this.x,0,character.x,0)<(50)&&dist(0,this.y,0,character.y)<25){
if(this.healthy == true){score+=1; this.state = false;}
      else{state = 'fail';}
    }
  }

  display(){

    if(this.state == true){
      push();
      translate(this.x,this.y);
      image(this.food,0,0);
      pop();
    }
  }

  update(){

    this.x += character.speedX*character.scale;
  }

}


function fail(){


  background('brown');
  
  textAlign(CENTER);
  textSize(60);
  text('You Lose',width/2,height/3);
  textSize(30);
  text('Your Score:'+String(score),width/2,height/1.5);
}


function food_detect(){

  for(let i = 0; i < foods.length;i++){

    foods[i].detect();
  }
}

function food_update(){

  for(let i = 0; i < foods.length;i++){

    foods[i].update();
  }
}

function food_display(){

  for(let i = 0; i < foods.length;i++){

    foods[i].display();
  }
}

function ongoing(){

  background("brown");

  let day_night = floor((millis()/dayLength)%2);
  if(day_night==0){image(day, 0, 0);}
  else{image(night, 0, 0);
    stars.update();
    stars.display();
  }

  image(city, -100, streetline - city.height);

  building_display();
  food_update();
  food_detect();
  food_display();


  if(character.y<600){  draw_cat();
    draw_tree();

  }

 else{  
  draw_tree();
  draw_cat();
  }
 

draw_car();

  
  p = random(1);
  if(p>0.9985){weather = 1- weather;}


   if(weather == 1){rain();}


}


function draw_cat(){

  character.update();
  character.display();

}


function draw_car(){


  p = random(1);
  if(p>0.995){cars.push(new Car);}

  for(let i = 0; i<cars.length;i++){


    cars[i].update();
    cars[i].display();
    cars[i].collision();
  }

  for(let i = cars.length-1;i>=0;i--){
    if(cars[i].x>width+200){cars.splice(i,1);}
  }



}



function draw_tree(){
  for (let i = 0; i < buildings.length; i++) {
    imageMode(CORNER);
    image(tree2,buildings[i].x-tree2.width/2,600-tree2.height);

  }
}

function building_move(SPEED) {
  for (let i = 0; i < buildings.length; i++) {
    buildings[i].move(SPEED);
  }
}

function building_display() {
  for (let i = 0; i < buildings.length; i++) {
    buildings[i].display();
  }
}

function keyPressed() {
  // 
  latestNewKeyPress = key;
  if (key == "ArrowLeft") {
    targetSpeedX = -2;
  } else if (key == "ArrowRight") {
    targetSpeedX = 2;
  }
}



class Cat {
  constructor() {
    this.x = width / 2;
    this.y = 550;
    this.speedY = 0;
    this.speedX = 0;
    this.rotation = 0;
    this.direction = 'left';
    this.scale = 1;
    this.interaction = false;
  }

  update() {
    this.speedX = lerp(this.speedX, targetSpeedX, 0.05);
   



    if (keyIsPressed) {
      if (latestNewKeyPress == "ArrowRight") {
        targetSpeedX = -4;
      } else if (latestNewKeyPress == "ArrowLeft") {
        targetSpeedX = 4;
      }
    } else {
      targetSpeedX = 0;
    }

    if (keyIsPressed) {
      if (key == "ArrowUp"&&this.y>500) {
        this.speedY = -1;
      } else if (latestNewKeyPress == "ArrowDown"&&this.y<height) {
        this.speedY = 1;
      } else {
        this.speedY = 0;
      }

    }
    
    this.y += this.speedY;
    this.scale = map(this.y,500,height,0.5,1);

    this.speedY *=this.scale;

    if(this.speedX ==0){      this.rotation = 0;}
    else{ this.rotation += 4;}


    if(this.speedX>0&&targetSpeedX>0){this.direction = 'left'}
    if(this.speedX<0&&targetSpeedX<0){this.direction = 'right'}


    building_move(this.speedX*this.scale);
  }
  
  display(){

    let oci = map(abs(this.speedX),0,4,0,0.2);
    imageMode(CENTER);
    push();
    translate(this.x, this.y);
    
    
    rotate(oci*sin(radians(this.rotation)));
    scale(this.scale);


    if(this.direction == 'left'){image(cat_left, 0,0);}
    if(this.direction == 'right'){image(cat_right, 0,0);}
    pop();
    imageMode(CORNER);
  }
}

class Building {
  constructor(preX) {
    let p = random(1);
    if (p < 0.9) {
      this.buildingType = "house";
    } else if (p < 0.95) {
      this.buildingType = "hospital";
    } else {
      this.buildingType = "school";
    }

    switch (this.buildingType) {
      case "house":
        let a = floor(random(house.length));
        this.building = house[a];
        break;
      case "hospital":
        this.building = hospital;
        break;
      case "school":
        this.building = school1;
        break;
    }

    this.x = preX - this.building.width;
    this.y = streetline - this.building.height;

    noStroke();

    this.road = createGraphics(building_size, height * (1 - 0.618));
    this.road.image(road, 0, 0);
    this.tree_collision = false;
  }

  display() {
    image(this.building, this.x, this.y);
    image(this.road, this.x, streetline);
  }

  move(SPEED) {
    this.x += SPEED;
  }
}




class Star {
  constructor(positionX, positionY) {
    this.x = positionX;
    this.y = positionY;
    this.brightness = random(255);
    this.decay = random(-5, 5);
    this.radius = random(1, 4);
    this.colors = [
      color(255, 210, 125),
      color(166, 168, 255),
      color(95, 56, 129),
      color(255, 215, 215),
    ];
    this.i = floor(random(4));
  }

  update() {
    if (this.brightness < 0 || this.brightness > 255) {
      this.decay *= -1;
    }
    this.brightness += this.decay;
  }

  display() {
    noStroke();

    this.colors[this.i].setAlpha(this.brightness);
    fill(this.colors[this.i]);
    circle(this.x, this.y, this.radius);
  }
}

class Stars {
  constructor() {
    this.starNum = 400;
    this.star = [];
    for (let i = 0; i < this.starNum; i++) {
      this.star.push(new Star(random(width), random(streetline)));
    }
  }

  update() {
    for (let i = 0; i < this.star.length; i++) {
      this.star[i].update();
    }
  }

  display() {
    for (let i = 0; i < this.star.length; i++) {
      this.star[i].display();
    }
  }
}

class Car{

  constructor(){
   
   this.x = -100;
   this.y = random(680,height);
   this.speed = random(7,10);
   
  }

  update(){

    this.x+=this.speed;
    

  }

  display(){
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(car,0,0);
    drawSpinningWheel(-100, 50,this.speed);
    // circle(25, 40, 30);
    drawSpinningWheel(100, 50,this.speed);
    imageMode(CORNER);
    pop();
  }
  
  collision(){

    if(dist(this.x,0,character.x,0)<(car.width/2+cat_left.width/2)&&dist(0,this.y,0,character.y)<20){

      state = 'fail';
    }

  }
  
}



function drawSpinningWheel(positionX,positionY,speed){
  push();
  translate(positionX, positionY);
  rotate( radians(frameCount*speed) );
  scale(1.4);
  // code here
  fill(0);
  circle(0, 0, 30);
  fill(120);
  rect(-10, -10, 20, 20)
  
  fill("green");
  circle(0, 0, 5);
  pop();
}   

function rain() {

  for (let i = 1; i < 30; i++) {
    rain_x = random(width);
    rain_y = random(height);
    Scale_rain = random(0.5, 1);
    
  stroke("white");
  strokeWeight(0.5);
  noFill();
  bezier(
    rain_x - 6 * Scale_rain,
    rain_y + 15 * Scale_rain,
    rain_x,
    rain_y + 15 * Scale_rain,
    rain_x,
    rain_y - 12 * Scale_rain,
    rain_x + 4 * Scale_rain,
    rain_y - 12 * Scale_rain
  );
  }

}