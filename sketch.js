var SIMON, mvSIMON
var suelo, mvsuelo
var suelo2
var cloud, cloudimg;
var jonh1
var jonh2
var jonh3
var jonh4
var jonh5
var jonh6
var GRUPOdBOBS
var GRUPOdENEMYS
var GAMESTATE = "play"
var smgameover
var txGM
var txGMimage
var buttomReset
var bmRtimage
var soundJump
var sdRecord
var sdLose
var score = 0
var textScore;
banderaScore = 0;
var scorePasado = 0;

function preload(){ //cargar las animaciones, sonidos o imagenes
  mvSIMON = loadAnimation("trex1.png", "trex3.png", "trex4.png");  
  smgameover = loadAnimation("trex_collided.png")
  mvsuelo = loadImage("ground2.png");
  cloudimg = loadImage("nubes.png");
  jonh1 = loadImage("obstacle1.png")
  jonh2 = loadImage("obstacle2.png")
  jonh3 = loadImage("obstacle3.png")
  jonh4 = loadImage("obstacle4.png")
  jonh5 = loadImage("obstacle5.png")
  jonh6 = loadImage("obstacle6.png")
  txGMimage = loadImage("gameOver.png")
  bmRtimage = loadImage("restart.png")
  soundJump = loadSound("jump.mp3")
  sdRecord = loadSound("checkpoint.mp3")
  sdLose = loadSound("die.mp3")

}
//FUNCION SET UP
function setup(){ //crear sprites, configurar 
  createCanvas(windowWidth,500);
  
  textFont('Permanent Marker');
  textSize(25)
  fill("red")
  
  SIMON = createSprite(50,290,40,100);
  SIMON.addAnimation("moveSMN", mvSIMON);
  SIMON.addAnimation("simonlose", smgameover)
  SIMON.scale = 0.5
  SIMON.debug = false
  SIMON.setCollider("circle",0,0,35)
  suelo = createSprite (width/2,300,width+100,15)
  suelo.scale = 1.15 
  suelo.addImage("suelo",mvsuelo);

  suelo2 = createSprite (200,310,400,15);
  suelo2.visible = false

  var numero = Math.round(random (1,100))
console.log (numero)

GRUPOdBOBS = new Group();
GRUPOdENEMYS = new Group();


txGM = createSprite(600,150)
txGM.addImage(txGMimage)
txGM.scale = 0.5
buttomReset = createSprite(600,255)
buttomReset.addImage(bmRtimage)
buttomReset.scale = 0.5

}
  


function draw(){
  //establecer color de fondo.
  background("white");
console.log(SIMON.y)

text ("sc: " + score, 1000,120)


  if (GAMESTATE === "play"){
    if ((keyDown("space")||keyDown(UP_ARROW)||touches.length>0) && SIMON.y>=277){
      SIMON.velocityY = -15
      soundJump.play ()
      touches = [];
    }
    //gravedad
    SIMON.velocityY +=0.8
    crearBobs();
    enemys()
    GRUPOdENEMYS.setVelocityXEach(-(5+(score/50)))
    suelo.velocityX = -(5+(score/50))
  //crear suelo
    if (suelo.x<0){
        suelo.x = width/2
  
    }
txGM.visible = false
buttomReset.visible = false
    
    if (GRUPOdENEMYS.isTouching (SIMON)){
      GAMESTATE = "GAME OVER"
    sdLose.play()

    }
    


if (score%50===0 && score>0 && banderaScore === 0){
  sdRecord.play()
  banderaScore = 1;
  scorePasado = score;
}

if(scorePasado !== score){
    banderaScore = 0;
}

  }
  if (GAMESTATE === "GAME OVER"){
     GRUPOdENEMYS.setVelocityXEach(0)
     GRUPOdBOBS.setVelocityXEach(0)
     suelo.velocityX = 0
     GRUPOdENEMYS.setLifetimeEach(-1)
     GRUPOdBOBS.setLifetimeEach(-1)
     SIMON.changeAnimation("simonlose",smgameover)
     SIMON.velocityY = 0

     txGM.visible = true
     buttomReset.visible = true

     if (mousePressedOver(buttomReset) || touches.length >0 ){
      score = 0
      SIMON.changeAnimation ("moveSMN", mvSIMON)
      GRUPOdENEMYS.destroyEach()
    GRUPOdBOBS.destroyEach()
    GAMESTATE = "play"
    touches = []
     }
  }

  SIMON.collide(suelo2);
  
  

  
  drawSprites();

}


function crearBobs(){
  if (frameCount % 60 === 0){
    cloud = createSprite(1200,100,50,15);
    cloud.addImage("bob",cloudimg);
    cloud.scale = 0.2
    cloud.velocityX = -5;
    cloud.y = Math.round(random(10,100));
    SIMON.depth = cloud.depth +1
    cloud.lifetime = 250
    GRUPOdBOBS.add (cloud)
    score += 25;
  }
  
  
}

function enemys(){
  var valor = 60
 /* if(score % 50 === 0 && valor >= 0){
    valor -= 2
  }*/

  if (frameCount % valor === 0){
    if(score >= 400){
      enemy2 = createSprite(1580,285,10,40);
  
      var number = Math.round(random(1,6))
        switch(number){
        case 1: enemy2.addImage("jonh1",jonh1);
        break
        case 2: enemy2.addImage("jonh2",jonh2);
       break
       case 3: enemy2.addImage("jonh3",jonh3);
       break
       case 4: enemy2.addImage("jonh4",jonh4);
    break
    case 5: enemy2.addImage("jonh5",jonh5);
    break
    case 6: enemy2.addImage("jonh6",jonh6);
    break

    
  }

  //enemy.velocityX = -(5+(score/100))
  enemy2.scale = 0.5
  enemy2.lifetime = 250
  
  GRUPOdENEMYS.add(enemy2)
    }
  enemy = createSprite(1200,285,10,40);
  
  var number = Math.round(random(1,6))
  switch(number){
    case 1: enemy.addImage("jonh1",jonh1);
    break
    case 2: enemy.addImage("jonh2",jonh2);
    break
    case 3: enemy.addImage("jonh3",jonh3);
    break
    case 4: enemy.addImage("jonh4",jonh4);
    break
    case 5: enemy.addImage("jonh5",jonh5);
    break
    case 6: enemy.addImage("jonh6",jonh6);
    break

    
  }

  //enemy.velocityX = -(5+(score/100))
  enemy.scale = 0.5
  enemy.lifetime = 250
  
  GRUPOdENEMYS.add(enemy)
  }
}









/*NOTAS:
1.-Para crear un Sprite del lado izquierdo se deben poner las localizaciones 
y del lado derecho estan las medidas.
*/