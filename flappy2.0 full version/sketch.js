let bird;
let pipes = [];
let lives = 100;
let score = 0;
let song;
let font;


function preload(){
    song = loadSound("music/Nintendo Wii - Mii Channel Theme.mp3");
    popSound = loadSound('music/pop.mp3 ');
    hitSound = loadSound('music/Oof2.mp3');
    font = loadFont('assets/Blox2.ttf');
    img = loadImage('assets/Flappy_Bird_sprite.png');
    songDead = loadSound('music/Game Over sound effect.mp3');

}

function setup() {
    createCanvas(640, 480);
    bird = new Bird();
    pipes.push(new Pipe());

    textFont(font);
    textAlign(CENTER, CENTER);

    song.loop();

}


function draw() {

    background(135,206,235);

    if(lives > 0){
        for (var i = pipes.length-1; i >= 0; i--) {
            pipes[i].show();
            pipes[i].update();
            pipes[i].updateSpeed();
            if (pipes[i].hits(bird)) {
                console.log("HIT");
                lives = lives - 3;
                hitSound.play();
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
        bird.showDead();
        bird.songDead();

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
            popSound.play();
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



