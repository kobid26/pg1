var Ground, BackgroundImage;
var ash, AshRunningImage;
var spikeObstacleImage, spikeObstacleImage2;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var pokemonGroup, obstaclesGroup;
var survivalTime = 0;
var restart,gameOver1;
var pokemonCount = 0;
var ashBattle;

function preload() {

  // obstacles pics
  BackgroundImage = loadImage("background.png");
  spikeObstacleImage = loadImage("spikeobstacle.png");
  spikeObstacleImage2 = loadImage("spikeobstacle2.png");
  mineObstacleImage = loadImage("mineobstacle.png");
  teamRocketImage = loadImage("teamrocketCropped.png")

  //pokemons and ash pics and music
  bgSound1 = loadSound("pokemon_vs_red.mp3")
  AshRunningImage = loadImage("ashrunning21.png");
  BulbaImage = loadImage("bulbasaurCropped.png");
  charmanderImage = loadImage("charmandercropped.png")
  pikachuImage = loadImage("pikachucropped.png");
  requazaImage = loadImage("requazacropped.png");
  squirtleImage = loadImage("squirtlecropped.png");
  abrakadabraImage = loadImage("abrakadabraCropped.png")
  arbokImage = loadImage("arbokCropped.png");
  blastoiseImage = loadImage("blastoiseCropped.png");
  charizardImage = loadImage("charizardCropped.png");
  jigglypuffImage = loadImage("jigglypuffCropped.png");
  psyduckImage = loadImage("psyduckCropped.png");
  sceptileImage = loadImage("sceptileCropped.png");
  snorlaxImage = loadImage("snorlaxcropped.png");
  steelixImage = loadImage("steelixCropped.png");
  venausaurImage = loadImage("venausaurcropped.png");
  darkaraiImg = loadImage("darkaraiImage.png");
  dialgaImg = loadImage("dialgaImage.png");
  palkiaImg = loadImage("palkiaImage.png");
  diancieImg = loadImage("diancieImage.png");
  arceusImg = loadImage("arceusImage.png");
  giratinaImg = loadImage("giratinaImage.png");
  greninjaImg = loadImage("greninjaImage.png");
  groudonImg = loadImage("groudonImage.png");
  HoOhImg = loadImage("HoOhImage.png");
  kyogreImg = loadImage("kyogreImage.png");
  lugiaImg = loadImage("lugiaImage.png");
  mewtoImg = loadImage("mewtoImage.png");
  tntImg = loadImage("tntImage.png")
  missileImg = loadImage("missileImage.png")


  // Game Over and Restart Button
  gameOver = loadImage("gameOver.jpg")
  restartButton123 = loadImage("restartButton.png")
}

function setup() {
  createCanvas(1200, 800);


  Ground = createSprite(0, 0, 600, 600);
  Ground.addImage(BackgroundImage);
  Ground.velocityX = -(5 + survivalTime / 100)

  invisibleGround = createSprite(400, 380, 900, 20);
  invisibleGround.visible = false;

  ash = createSprite(100, 330, 20, 20);
  ash.addImage(AshRunningImage);
  ash.scale = 0.25;
  ash.setCollider("circle", 0, 0, 300);
  ash.debug=true;


  obstaclesGroup = new Group();
  pokemonGroup = new Group();
}

function draw() {

  if (keyDown("b")){
    gameState = battle
  }

 
  if (gameState === PLAY) {
    //bgSound1.play();
    if (keyDown("space") && ash.y >= 260) {
      ash.velocityY = -12;
    }
    
    ash.velocityY = ash.velocityY + 0.8;
    if (Ground.x < 0) {
      Ground.x = Ground.width / 2;
    }
    if (keyDown("c") && ash.isTouching(pokemon)) {
      pokemon.destroy();
      pokemonCount = pokemonCount+1
    }
    spawnObstacles();
    spawnPokemon();
    spawnMissiles()
    if (ash.isTouching(obstaclesGroup)) {
      gameState = END
    }
  } else if (gameState === END) {


    obstaclesGroup.setVelocityXEach(0);
    ash.velocityX = 0;
    pokemonGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    pokemonGroup.setLifetimeEach(-1);
  }
  if (mousePressedOver(restart)){
    reset();
    restart.visible = false;
  gameOver1.visible = false
  }

  ash.collide(invisibleGround);

  drawSprites();
  if (gameState === END) {
    Ground.velocityX = 0;
    stroke("red");
    textSize("18");
    fill("red");
    restart = createSprite(800, 500);
    restart.addImage(restartButton123);
    restart.scale = 0.15

    gameOver1 = createSprite(300,300,0,1200)
    gameOver1.addImage(gameOver)
    
    gameOver1.depth=restart.depth
    restart.depth=restart.depth+1
  }
  stroke("black");
  textSize("28");
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("SURVIVAL TIME =" + survivalTime, 100, 50)

  stroke("brown");
  textSize(32);
  textFont("segoeUI")
  text("Pokemons Collected =>"+pokemonCount,450,50)

}

function reset() {
  gameState = PLAY;
  restart.visible = false;
  gameOver1.visible = false
  obstaclesGroup.destroyEach();
  pokemonGroup.destroyEach();
  pokemon = 0;
}
function spawnObstacles() {
  if (frameCount % 200 === 0) {
    Obstacle = createSprite(900, 387, 10, 10);
    Obstacle.scale = 0.3;
    Obstacle.velocityX = -(6 + survivalTime / 100);
    obstaclesGroup.add(Obstacle);
    Obstacle.lifetime = 600;
    Obstacle.setCollider("circle",0,0,130)
    Obstacle.debug=true;

    var rand = Math.round(random(1, 5));
    switch (rand) {
      case 1:
        Obstacle.addImage(spikeObstacleImage);
        break;
      case 2:
        Obstacle.addImage(spikeObstacleImage2);
        break;
      case 3:
        Obstacle.addImage(mineObstacleImage)
        break;
      case 4:
        Obstacle.addImage(teamRocketImage);
        break;
      case 5:
        Obstacle.addImage(tntImg)

      default:
        break;



    }
  }
}

function spawnPokemon() {

  if (frameCount % 250 === 0) {
    pokemon = createSprite(900, 370, 30, 30);
    pokemon.velocityX = -2;
    pokemon.scale = 0.3;
    pokemonGroup.add(pokemon);
    pokemon.lifetime = 600;
    pokemon.x = Math.round(random(420, 430));

    var rand = Math.round(random(1, 26));
    switch (rand) {
      case 1:
        pokemon.addImage(BulbaImage);
        break;
      case 2:
        pokemon.addImage(charmanderImage);
        break;
      case 3:
        pokemon.addImage(requazaImage);
        break;
      case 4:
        pokemon.addImage(pikachuImage);
        break;
      case 5:
        pokemon.addImage(squirtleImage);
        break;
      case 6:
        pokemon.addImage(abrakadabraImage)
        break;
      case 7:
        pokemon.addImage(arbokImage);
        break;
      case 8:
        pokemon.addImage(blastoiseImage);
        break;
      case 9:
        pokemon.addImage(charizardImage);
        break;
      case 10:
        pokemon.addImage(jigglypuffImage);
        break;
      case 11:
        pokemon.addImage(psyduckImage);
        break;
      case 12:
        pokemon.addImage(sceptileImage);
        break;
      case 13:
        pokemon.addImage(snorlaxImage);
        break;
      case 14:
        pokemon.addImage(steelixImage);
        break;
      case 15:
        pokemon.addImage(darkaraiImg);
        break;
      case 16:
        pokemon.addImage(dialgaImg);
        break;
      case 17:
        pokemon.addImage(palkiaImg);
        break;
      case 18:
        pokemon.addImage(mewtoImg);
        break;
      case 19:
        pokemon.addImage(kyogreImg);
        break;
      case 20:
        pokemon.addImage(HoOhImg);
        break;
      case 21:
        pokemon.addImage(arceusImg);
        break;
      case 22:
        pokemon.addImage(diancieImg);
        break;
      case 23:
        pokemon.addImage(groudonImg);
        break;
      case 24:
        pokemon.addImage(greninjaImg);
        break;
      case 25:
        pokemon.addImage(giratinaImg);
        break;
      case 26:
        pokemon.addImage(lugiaImg);
        lugiaImg.scale=0.2
        break;
      default:
        break;



    }
  }
}
function spawnMissiles(){
  if (frameCount % 100 === 0){
    missile = createSprite(1000,400,20,20)
    missile.addImage(missileImg);
    missile.scale=0.2;
    missile.velocity=-4;
    if (missile.isTouching(ash)){
      gameState = END
    }

  }
}
