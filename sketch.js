var clebinho,clebinho_img, clebinho_oof, clebinho_rebaxado;
var bordas;
var chao,chao_img;
var chaoinv;
var nuvem;
var nuvemimg; 
var obst;
var ponto = 0;

var grupoobst;
var gruponuvem;

var gameover, gameover_img, restart, restart_img;

var jump_sound,die_sound,checkpoint_sound;


var INICIAR = 0;
var FIM = 1;
var modo = INICIAR;


function preload(){
  //pre carrega as imagens do jogo
  
  clebinho_img = loadAnimation("trex1.png","trex3.png","trex4.png");
  clebinho_oof = loadImage("trex_collided.png");
  clebinho_rebaxado = loadAnimation("trex_low1.png", "trex_low2.png");
  
  chao_img = loadImage("ground2.png");
  
  nuvemimg = loadImage("cloud.png");
 
   obst1 = loadImage("obstacle1.png");
   obst2 = loadImage("obstacle2.png");
   obst3 = loadImage("obstacle3.png");
   obst4 = loadImage("obstacle4.png");
   obst5 = loadImage("obstacle5.png");
   obst6 = loadImage("obstacle6.png");
  
   gameover_img = loadImage("gameOver.png");
   restart_img = loadImage("restart.png")
  
  jump_sound = loadSound("jump.mp3");
  checkpoint_sound = loadSound("checkPoint.mp3");
  die_sound = loadSound("die.mp3");
  
  
}


function setup(){
 createCanvas(600,200);
  
   //configuração do clebinho
  clebinho = createSprite(50,150,20,20);
  clebinho.addAnimation("running",clebinho_img);
  clebinho.scale = 0.6;
  clebinho.debug = false;
  clebinho.setCollider("circle",0,0,30);
  clebinho.addImage("oof", clebinho_oof);
  clebinho.addAnimation("rebaxado", clebinho_rebaxado);
  
  bordas = createEdgeSprites();
  
   chao = createSprite(300,185,600,20);
   chao.addImage("ground",chao_img);
  
  chao.x = chao.width/2;
  
  chaoinv = createSprite(300,190,600,15)
  
  chaoinv.visible = false;
  
  grupoobst = new Group();
  gruponuvem = new Group();
  
  gameover =  createSprite(300,70,10,10);
  gameover.addImage("gameover", gameover_img);
  gameover.visible = false;
  
  
  restart =  createSprite(300,110,10,10);
  restart.addImage("restart", restart_img);
  restart.visible = false;
  
}

function draw(){
  background("white");
    
  
  fill('black');
  textSize(20);
  text(ponto,540,20);
  
  if (ponto % 100 === 0 && ponto > 0){
    
    checkpoint_sound.play();
  }
  
  
  if (modo === INICIAR){
    
    //pulo do clebinho
    if((keyDown("space") || keyDown("UP_ARROW")) && clebinho.isTouching(chao)){
     
      clebinho.velocityY = -13;
      
      jump_sound.play();
    }
    
    if (chao.x < 0){
    chao.x = chao.width/2;
  }
    
    if (keyDown("DOWN_ARROW")){
    clebinho.changeAnimation("rebaxado");
    
  }
  
  else {clebinho.changeAnimation("running")}
    
    
     ponto = ponto + Math.round(frameRate() / 60);
    
    chao.velocityX = -(8+ponto/100);
    
     nuvens();
  
  obstaculo();
    
     //gravidade
  clebinho.velocityY = clebinho.velocityY + 1;
    
    
    if(clebinho.isTouching(grupoobst)){
      modo = FIM;
      
      clebinho.changeAnimation("oof");
      
      die_sound.play();
      
                  
    }
    
  }
  else if(modo === FIM){
    
    chao.velocityX = 0;
    
    grupoobst.setVelocityXEach(0);
    gruponuvem.setVelocityXEach(0);
    
    clebinho.velocityY = 0
    
    grupoobst.setLifetimeEach(-1);
    gruponuvem.setLifetimeEach(-1);
    
    gameover.visible = true;
    restart.visible = true;
    
    if (mousePressedOver(restart)){
      
      reset();
      
    }
  }
  
  
  
  
  
  clebinho.collide(chaoinv);
  
  drawSprites();
 }


function nuvens(){
  
  if (frameCount % 80 === 0){
    
     
  nuvem = createSprite(610,50,10,10);
    
    nuvem.y = Math.round(random(40,120));
  
  nuvem.velocityX = -(3+ponto/100);  
    
  nuvem.addImage(nuvemimg);
    
    nuvem.scale = 0.7;
    
   clebinho.depth = nuvem.depth;
    
    clebinho.depth = clebinho.depth + 1;
    
    nuvem.lifetime = 212;
    
    gruponuvem.add(nuvem);
    
    gameover.depth = nuvem.depth;
    
    gameover.depth = gameover.depth +1;
    
    
    }
 
 }

function obstaculo(){
    
    if(frameCount % 60 === 0){
      
      obst = createSprite(550,170,20,10);
    
      obst.velocityX = -(8+ponto/100);
      
      var rand = Math.round(random(1,6));
      
      switch(rand){
        case 1: obst.addImage(obst1);
          break;
        case 2: obst.addImage(obst2);
          break;
        case 3: obst.addImage(obst3);
          break;
        case 4: obst.addImage(obst4);
          break;
        case 5: obst.addImage(obst5);
          break;
        case 6: obst.addImage(obst6);
          break;
          
          default : break;
          
      }
      
      obst.scale = 0.5;
    
      obst.lifetime = 115;
      
      grupoobst.add(obst);
    
    }
    
  }
    
function reset(){
      
  modo = INICIAR;
  
  grupoobst.destroyEach();
  
  gruponuvem.destroyEach();
  
  gameover.visible = false;
  
  restart.visible = false;
  
  ponto = 0;
  
  
}
    
    
    
    
    
    
    
    
    
    
    
    
