let five, wordData, AI;
let prevInPlace = -1, prevMatching = -1;
let guessCount = 0;
function preload(){
  wordData = loadStrings("words.txt");
}
function setup(){
  five = new Five(wordData);
  createCanvas(windowWidth,windowHeight);
  AI = new Ai(wordData);
  drawUI();
}
function keyPressed(){
  if(keyCode === 84){
    setup();
    while(five.guessing){
      let guess = AI.makeGuess(prevMatching, prevInPlace);
      five.addGuess(guess);
      prevMatching = five.getLastCounts()[0];
      prevInPlace = five.getLastCounts()[1];
      //AI.printShit(guessCount++); so just fyi, cant reassign class properties 
      drawUI();
    }
  drawUI();
  }
}
function drawUI(){
  background(255);
  five.drawUI();
}