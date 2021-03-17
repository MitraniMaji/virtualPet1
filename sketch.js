var dog;
var dogImg, happyDogImg
var database;
var foodS, foodStock;

function preload(){
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  console.log(database);
  dog = createSprite(350, 350);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  foodStock = database.ref("Food");
  foodStock.on('value', readStock);
  console.log(foodS);
  
}


function draw() {  
  background(46, 139, 87);
  console.log(foodS);

  if(keyWentDown(UP_ARROW) && foodS > 0){
    console.log("before")
    writeStock(foodS);  
    dog.addImage(happyDogImg);  
  }
  
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }

  textSize(20);
  fill("blue");
  text(foodS);
  drawSprites();
}

function readStock(data){
  console.log("Inside readstock");
  foodS = data.val();
  console.log(foodS);
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }

  database.ref("/").update({
    Food: x
  })
}


