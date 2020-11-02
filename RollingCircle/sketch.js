let speedSlider, diameter = 20,turnCount = 20;
function setup() {
  if(windowHeight < windowWidth)
    createCanvas(windowHeight, windowHeight)
  else
    createCanvas(windowHeight, windowWidth)
  speedSlider = createSlider(200, 1000, 500)
  speedSlider.position(10, 10)
  speedSlider.style('width', '80px')
  angleMode(DEGREES)
  turnCount*=2
}
function drawLines(){
  stroke(255)
  for(let i = 1; i < turnCount;i++){
    line(-width/2,0,width/2,0)
    rotate(360/turnCount)
  }
}
function movingCircles(){ 
  fill(255)
  for(let i = 1; i <= turnCount/2;i++){
    circle(map(Math.sin(millis()/speedSlider.value()+i*PI/(turnCount/2)), -1, 1, -width/2+diameter/2, width/2-diameter/2),0,diameter)
    rotate(360/turnCount)
  }
}
function draw() {
  background(255)
  translate(width/2,height/2)
  
  //main circle
  fill(0)
  circle(0, 0, height)
  
  push()
  drawLines()
  pop()//returns default rotation
  
  push()
  movingCircles()
  
  pop()
}