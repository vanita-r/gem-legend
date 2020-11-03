var gameState;
var score=0;
var monsterGroup;
var lifeGroup;
var attackMode=0;
var lifeLength=5;
var lifeMode=0;
var monsterhealth=5;
var monsterHealthGroup;
var GEMS;


var gameState = "start";

function preload(){
  grassIMG=loadImage("grass.png");
//gems
  gem=loadImage("gems/tile000.png");
  gem2=loadImage("gems/tile001.png");
  gem3=loadImage("gems/tile002.png");
  gem4=loadImage("gems/tile003.png");
  gem5=loadImage("gems/tile004.png");
  gem6=loadImage("gems/tile005.png");
  gem7=loadImage("gems/tile006.png");
  gem8=loadImage("gems/tile007.png");
  gem9=loadImage("gems/tile008.png");
  gem10=loadImage("gems/tile009.png");
  gem11=loadImage("gems/tile010.png");
  gem13=loadImage("gems/tile011.png");
  gem14=loadImage("gems/tile012.png");
  gem15=loadImage("gems/tile013.png");
  gem16=loadImage("gems/tile014.png");
  gem17=loadImage("gems/tile015.png");
  gem18=loadImage("gems/tile016.png");
  gem19=loadImage("gems/tile017.png");
  //boyImg=loadAnimation("images/tile000.png","images/tile001.png","images/tile002.png","images/tile003.png","images/tile004.png","images/tile005.png","images/tile006.png","images/tile007.png");
  boyIMG=loadAnimation("images/tile000.png","images/tile001.png","images/tile002.png");
  walk1=loadAnimation("images/tile006.png","images/tile007.png","images/tile008.png");
  attackImg=loadAnimation("images/tile003.png","images/tile004.png","images/tile005.png","images/tile006.png","images/tile007.png");
  backImg=loadImage("background.jpeg");
  lifeImg=loadImage("pixelheart.png");
//monster health bar
  health=loadImage("health bar/health-bar1.png");
  health2=loadImage("health bar/health-bar2.png");
  health3=loadImage("health bar/health-bar3.png");
  health4=loadImage("health bar/health-bar4.png");
  health5=loadImage("health bar/health-bar6.png");
//monster walk animation
  monsterImg=loadAnimation("monster sheet/tile1.png","monster sheet/tile2.png","monster sheet/tile6.png","monster sheet/tile7.png","monster sheet/tile8.png","monster sheet/tile9.png","monster sheet/tile10.png","monster sheet/tile11.png");
//monster attack animation
  attack2=loadAnimation("monster sheet/tile12.png","monster sheet/tile13.png","monster sheet/tile14.png");
  
}

function setup() {
  createCanvas(displayWidth/1,displayHeight);
  ground=createSprite(displayWidth/2,displayHeight/2);
  ground.addImage("backImg",backImg);
  ground.scale=1.8;
  
  grass=createSprite(displayWidth/2,displayHeight/2+120);
  grass.addImage("grass.IMG",grassIMG);
  grass.scale=4;


  boy=createSprite(400, displayHeight/2, 50, 50);
  boy.shapeColor="white";
  boy.addAnimation("boyIMG",boyIMG);
  boy.addAnimation("attackImg",attackImg);
  boy.addAnimation("walk1",walk1);
  boy.scale=1.5;
  boy.mirrorX(boy.mirrorX() * -1);
  //boy.debug=true;
  boy.setCollider("rectangle",0,0,60,60);
  
  monsterGroup=new Group();
  lifeGroup=new Group();
  monsterHealthGroup=new Group();
  Life(lifeLength);
  for(var i=5; i>=1; i--){
    monsterHealthBar(i);
  }
  
}

function draw() {
  background(145, 221, 242);  
  //image(backImg,0,0,displayWidth,displayHeight);
  ground.velocityX=-5;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(frameCount%120===0){
    spawnMonsters();
  }


  if(keyWentDown("SPACE")){
    boy.changeAnimation("attackImg",attackImg);
    attackMode=1;
  }
  if(keyWentUp("SPACE")){
    boy.changeAnimation("boyIMG",boyIMG);
    attackMode=0;
  }
  if(keyWentDown(UP_ARROW)){
    boy.velocityY=-8;
    boy.changeAnimation("walk1",walk1);
  }
  if(keyWentUp(UP_ARROW)){
    boy.velocityY=0;
    boy.changeAnimation("boyIMG",boyIMG);
  }
  if(keyWentDown(DOWN_ARROW)){
    boy.velocityY=8;
    boy.changeAnimation("walk1",walk1);
  }
  if(keyWentUp(DOWN_ARROW)){
    boy.velocityY=0;
    boy.changeAnimation("boyIMG",boyIMG);
  }
  if(keyWentDown(RIGHT_ARROW)){
    boy.velocityX=8;
    boy.changeAnimation("walk1",walk1);
  }
  if(keyWentUp(RIGHT_ARROW)){
    boy.velocityX=0;
    boy.changeAnimation("boyIMG",boyIMG);
  }
  if(keyWentDown(LEFT_ARROW)){
    boy.velocityX=-9;
    //boy.mirrorX(boy.mirrorX() * -1);
    boy.changeAnimation("walk1",walk1);
  }
  if(keyWentUp(LEFT_ARROW)){
    boy.velocityX=0;
    boy.mirrorX(boy.mirrorX() * -1);
    boy.changeAnimation("boyIMG",boyIMG);
  }

  for(var i=0;i<monsterGroup.length; i++){
    if(monsterGroup.get(i).x<600){
      //console.log(monsterGroup.get(i).x);
      monsterGroup.get(i).changeAnimation("attack2",attack2);
    }

    if(monsterGroup.get(i).isTouching(boy)){
      monsterGroup.get(i).changeAnimation("monsterImg",monsterImg);
      if(attackMode===1){
        monsterhealth=monsterhealth-1;
        monsterGroup.get(i).destroy();
        monsterHealthGroup.get(monsterhealth).destroy();
        score=score+Math.round(random(5,15));
      }else if(attackMode===0){
        lifeMode=1;
        boy.destroy();
      }
    }
  }
  /*for(var i=lifeGroup.length;i>0;i--){
  }*/
  if(lifeMode===1 && lifeLength>0){
    lifeMode=0;
    lifeLength=lifeLength-1
    lifeGroup.get(lifeLength).destroy();

    boy=createSprite(400, displayHeight/2, 50, 50);
    boy.shapeColor="white";
    boy.addAnimation("boyIMG",boyIMG);
    boy.addAnimation("attackImg",attackImg);
    boy.addAnimation("walk1",walk1);
    boy.scale=1.5;
    boy.mirrorX(boy.mirrorX() * -1);
    boy.setCollider("rectangle",0,0,60,60);
  }

  drawSprites();
  textSize(20);
  fill("white");
  text("SCORE: "+score, displayWidth/2,30);

  textSize(20);
  fill("white");
  text("LIFE: ", 10,35);

  textSize(20);
  fill("white");
  text("MONSTER HEALTH: ", displayWidth/1.3,30);

  if(lifeLength===0){
    monsterGroup.destroyEach();
    boy.destroy();
    ground.velocityX=0;
    textSize(40);
    fill("red");
    text("GAME OVER",displayWidth/2,displayHeight/2);
  }

  if(monsterhealth===0){
    monsterGroup.destroyEach();
    boy.destroy();
    ground.velocityX=0;
    textSize(40);
    fill("orange");
    text("GAME WIN",displayWidth/2,displayHeight/2);
  }
  spawnGems();
}

function spawnMonsters(){
  var monster;
  monster=createSprite(displayWidth,displayHeight/2,20,20);
  monster.addAnimation("monsterImg",monsterImg);
  monster.addAnimation("attack2",attack2);
  monster.scale=0.7;
  monster.velocityX=-2;
  //monster.debug=true;
  monster.setCollider("rectangle",0,0,105,105);

  monsterGroup.add(monster);
}

function Life(lifeLeft){
  for(var i=1;i<=lifeLeft;i++){
    var life=createSprite(60*i,30);
    life.addImage("lifeImg",lifeImg);
    life.scale=0.04
    lifeGroup.add(life);
  }
}

function monsterHealthBar(monsterHealthLeft){
  var monsterhealth;
  monsterhealth=createSprite(displayWidth-100, 30, 50, 50);
  switch(monsterHealthLeft){
    case 1:  
      monsterhealth.addImage("health", health);
      break
    case 2:
      monsterhealth.addImage("health2", health2);
      break
    case 3:
      monsterhealth.addImage("health3", health3);
      break
    case 4:
      monsterhealth.addImage("health4", health4);
      break
    case 5:
      monsterhealth.addImage("health5", health5);
    }
      monsterhealth.scale=0.1;
  monsterHealthGroup.add(monsterhealth);
}

function spawnGems(){
  var gemSpawn=Math.round(random(1,18))
  gems=createSprite(displayWidth,displayHeight/2)
  switch(gemSpawn){
    case 1:  
      gems.addImage("gem", gem);
      break
    case 2:
      gems.addImage("gem2", gem2);
      break
    case 3:
      gems.addImage("gem3", gem3);
      break
    case 4:
      gems.addImage("gem4", gem4);
      break
    case 5:
      gems.addImage("gem5", gem5);
      break
    default:
      gems.addImage("gem17", gem17);
    } 
    gems.scale=0.5;
    gems.velocityX=-4;
}