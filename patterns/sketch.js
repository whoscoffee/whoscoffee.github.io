/*
  this is a pattern maker
  u make a small little art
  then i tile it out
  
  Made By
    JACOB D BURGESS
*/
let colorPicker, cnvHeight,gridSize=10,guideSize=8*gridSize;
let gridButton,gridOn = true;
let lineThickness = 3;
let events = [],eventCount = 0;
function setup() {
  cnvHeight = windowHeight-windowHeight*0.1;
  createCanvas(windowWidth, cnvHeight);
  background(255);
  colorPicker = createColorPicker(color(0,255,0));
  gridButton = createButton('GRID?');
  gridButton.mousePressed(gridSwitch);
  gennyButton = createButton("Generate?");
  gennyButton.mousePressed(generateRandomPattern);
  drawButtons();
  drawGrid(gridSize);
  drawGuide(guideSize);
}
/*
    graphics
*/
function drawButtons(){
  colorPicker.position(0,cnvHeight+10);
  gridButton.position(100,cnvHeight+10);
  gennyButton.position(200,cnvHeight+10);
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
function draw(){
    if(gridOn)
        drawGrid(gridSize);

    drawGuide(guideSize);}
function drawGuide(size){
  let x = snap(windowWidth/2);
  let y = snap(cnvHeight/2);
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
function drawTile(x,y,c){
  x = snap(x);
  y = snap(y);
  fill(c);
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
//recreates previous events
function drawEvents(){
  for(let i = 0; i < eventCount;i++)
    drawTile(events[i][0],events[i][1],events[i][2]);
}
/*
    EVENTS
*/
function windowResized(){
  cnvHeight = windowHeight-windowHeight*0.1;
  resizeCanvas(windowWidth, cnvHeight);
  drawButtons();
  background(255);
  drawEvents();
}
//adds an event to 'events'
function addEvent(x,y,c){
  events[eventCount] = [];
  events[eventCount][0] = x;
  events[eventCount][1] = y;
  events[eventCount++][2] = c;
}
function mousePressed(){
  if(mouseY < cnvHeight){
    drawTile(mouseX,mouseY,colorPicker.color());
    addEvent(mouseX,mouseY);
  }
}
/*
    HELPERS
 */
//snaps n to grid
function snap(n){
  n = round(n);
  while(n%gridSize!=0)
    n--;
  return n;
}
function gridSwitch(){
    if(gridOn){
        gridOn=false;
        background(255);
        drawEvents();
    }else 
        gridOn=true;
}
/*
    THE GENNY
*/
function generateRandomPattern(){
    let xx = snap(windowWidth/2);
    let yy = snap(cnvHeight/2);
    let s = guideSize/2, c;
    let cors = [];
    for(let x = 0; x < 4; x++)
        cors[x] = color(random(0,255),random(0,255),random(0,255));
    for(let x=xx-s; x<xx+s; x+=gridSize)
        for(let y=yy-s; y<yy+s; y+=gridSize){
            c = cors[round(random(0,4-1))];
            drawTile(x,y,c);
            addEvent(x,y,c);
        }
    
}