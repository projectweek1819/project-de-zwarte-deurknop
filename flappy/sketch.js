var bird;
var pipes = [];
var lives = 100;
var score = 0;
var song;
var font;



function preload(){
	song = loadSound('music/Spider-Man 2 The Game Pizza Theme.mp3 ');
  font = loadFont('Blox2.ttf');
}

function setup() {
  createCanvas(640, 480);
  bird = new Bird();
  pipes.push(new Pipe());

  textFont(font);
  textAlign(CENTER, CENTER);

  song.loop();
  
  songDead = loadSound('NANI ! meme sound effect.mp3');
}


function draw() {  
  background(0, 255, 255);  

  if(lives > 0){
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();
      pipes[i].updateSpeed();
      if (pipes[i].hits(bird)) {
        console.log("HIT");
        lives = lives - 2; 
      }

      if (pipes[i].offscreen()) {
        score++;
        pipes.splice(i, 1);
      }
    }
  }

  bird.update();
 	
  
  if (lives > 0 ){
  	bird.show();
    drawHealth();
  }
  
  if (lives <= 0){
    bird.showDEAD();
    textAlign(CENTER);
  	drawWords( width * 0.5 );
    song.stop();
  }

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
  
  
  if (lives > 0) {
  	textAlign(CENTER);
    drawScore(width * 0.5);
  }
}



function keyPressed() {
  if (lives > 0){
    if (key === ' ') {
      bird.up();
    }
  }
}

function drawWords(x){
	fill(0);
  text("GAME OVER", x, height/2 -80);
  text("SCORE", x , height/2);
  text(score, x, height/2 + 70);
  textSize(70);
}

function drawScore(x){
	fill(0);
  text(score, x, height/2 -50);
  textSize(70);
}

function drawHealth() {
	fill(255,0,0);
  textSize(30);
  text("Health", 100,  50);
  text(lives, 170, 50);
}




