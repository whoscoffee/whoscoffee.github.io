let speedSlider, diameter = 20
let countSlider;
function setup() {
  if(windowHeight < windowWidth)
    createCanvas(windowHeight, windowHeight)
  else
    createCanvas(windowHeight, windowWidth)
  speedSlider = createSlider(200, 1000, 500)
  speedSlider.position(10, 10)
  speedSlider.style('width', '80px')
  
  countSlider = createSlider(2,400,40)
  countSlider.position(10,30)
  countSlider.style('width', '80px')
  angleMode(DEGREES)
  //countSlider.value()*=2
}
function drawLines(){
  stroke(255)
  for(let i = 1; i < countSlider.value()*2;i++){
    line(-width/2,0,width/2,0)
    rotate(360/countSlider.value()*2)
  }
}
function movingCircles(){ 
  fill(255)
  for(let i = 1; i <= countSlider.value();i++){
    circle(map(Math.sin(millis()/speedSlider.value()+i*PI/(countSlider.value())), -1, 1, -width/2+diameter/2, width/2-diameter/2),0,diameter)
    rotate(360/countSlider.value()*2)
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