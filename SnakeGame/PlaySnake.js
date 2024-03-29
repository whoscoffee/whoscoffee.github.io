let game;
function setup() {
    background(0)
    let size = windowWidth < windowHeight ? windowWidth : windowHeight;
    game = new SnakeGame(size,10);
}
/*
    controls
*/
function keyPressed() {
    if(keyCode == 38 && game.dir != 1){//arrow up
        game.dir = 0;
    }if(keyCode == 40 && game.dir != 0){//arrow down
        game.dir = 1;
    }if(keyCode == 37 && game.dir != 3){//arrow left
        game.dir = 2;
    }if(keyCode == 39 && game.dir != 2){//arrow right
        game.dir = 3;
    }if(keyCode == 82){//restart game 'R'
        game.makeSnake();
    }
}
function draw() {
  if(!game.gameOver){
    game.play();
    game.drawSnake();
    game.drawFood();
    game.drawUI();
  }else
    game.endGame();
}