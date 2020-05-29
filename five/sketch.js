let five,data;
function preload(){
  data = loadStrings("words.txt");
}
function setup(){
  five = new Five(data);
  createCanvas(windowWidth,windowHeight);
  five.startGame();
  this.inBox = createInput('');
  this.inBox.input(this.inputEvent);
  this.inBox.position(10, 85);
}
function inputEvent(){
  if(this.value().length == 5)
    five.addGuess(this.value());
  else if(this.value() == "restart")
    five.restart();
}
function draw(){
  background(255);
  five.drawUI();
}