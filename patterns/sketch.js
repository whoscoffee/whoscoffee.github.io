/*
  this is a pattern maker
  u make a small little art
  then i tile it out
  
  Made By
    JACOB D BURGESS
*/


//                       SETUP
//##########################################################
let colorPicker, cnvHeight,gridSize=10,guideSize=8*gridSize;
let lineThickness = 3;
let events = [],eventCount = 0;
function setup() {
  cnvHeight = windowHeight-windowHeight*0.1;
  createCanvas(windowWidth, cnvHeight);
  background(255);
  colorPicker = createColorPicker(color(0,255,0));
  drawButtons();
  drawGrid(gridSize);
  drawGuide(guideSize);
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//          Graphics
//###########################
function drawButtons(){
  colorPicker.position(0,cnvHeight);
}
//makes black grid on cnv
function drawGrid(size){
  stroke(0);
  strokeWeight(lineThickness);
  for(let x = 0; x < windowWidth;x+=size)
      line(x,0,x,cnvHeight);
  for(let y = 0; y < cnvHeight;y+=size)
      line(0,y,windowWidth,y);
}
function draw(){drawGrid(gridSize);drawGuide(guideSize);}
function drawGuide(size){
  //finds approximent
  x = round(windowWidth/2);
  y = round(cnvHeight/2);
  //finds exact
  x = snap(x);
  y = snap(y);
  //colors
  stroke(color(0,255,0));
  strokeWeight(lineThickness);
  //makes box with lines given distance from center "s"
  let s = size/2
  line(x-s,y-s,x-s,y+s);
  line(x-s,y+s,x+s,y+s);
  line(x+s,y+s,x+s,y-s);
  line(x+s,y-s,x-s,y-s);
}
//possible want to use recursion todo a spiral instead of this shit
function drawTile(x,y){
  x = snap(x);
  y = snap(y);
  fill(colorPicker.color());
  square(x,y,gridSize);
  //buttom right
  for(let xx = x; xx < windowWidth;xx+=guideSize)
    for(let yy = y; yy < cnvHeight;yy+=guideSize)
      square(xx,yy,gridSize);
  //top left
  for(let xx = x; xx >= 0;xx-=guideSize)
    for(let yy = y; yy >= 0;yy-=guideSize)
      square(xx,yy,gridSize);
  //top right
  for(let xx = x+guideSize; xx < windowWidth;xx+=guideSize)
    for(let yy = y-guideSize; yy >= 0;yy-=guideSize)
      square(xx,yy,gridSize);
  //bottom left
  for(let xx = x-guideSize; xx >= 0;xx-=guideSize)
    for(let yy = y+guideSize; yy < cnvHeight;yy+=guideSize)
      square(xx,yy,gridSize);
}
function drawEvents(){
  for(let i = 0; i < eventCount;i++)
    drawTile(events[i][0],events[i][1]);
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^


//          EVENTS
//###########################
function windowResized(){
  cnvHeight = windowHeight-windowHeight*0.1;
  resizeCanvas(windowWidth, cnvHeight);
  drawButtons();
  background(255);
  drawEvents();
}
function addEvent(x,y){
  events[eventCount] = [];
  events[eventCount][0] = x;
  events[eventCount++][1] = y;
}
function mousePressed(){
  if(mouseY < cnvHeight){
    drawTile(mouseX,mouseY);
    addEvent(mouseX,mouseY);
  }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^

function snap(n){
  n = round(n);
  while(n%gridSize!=0)
    n--;
  return n;
}