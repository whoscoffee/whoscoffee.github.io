/*
  this is a pattern maker
  u make a small little art
  then i tile it out
  
  Made By
    JACOB D BURGESS
*/


//my probability math
/*
Given
16 spots
4 random colors 
4 random colors fill 16 given spots with a random amount of said 4 colors

the chances for one random color is 255*255*255:1
Or
16,581,375:1

for 4 colors to be the same 
It’s
16,581,375^4:1

So there are 16 cubes , 4 possible colors a cube

The chances of u getting the same exact cube color for one cubeis 
4:1 
The chances of u getting the same random picks for all 16 cubes
4^16:1
Or
4.294967e9:1
Or
4,294,967,296

So the chances of u getting the same exact pattern is
4,294,967,296* 16,581,375^4:1
Or
4.294967e9*7.55931e28
Or
3.2466987e+38
Or
In undecillion 
An Undecillion == 1x10^36

Final chances are
324Undecillions  of different possible patterns with X and y mirroring on a 8x8 grid

And it’s a fuckton more without X and Y mirroring

That’s a-lot of damage

 */
/*

ISSUE WITH UNCHECKING XMIRROR AND YMIRROR

*/
let colorPicker, cnvHeight,gridSize=10,guideSize=8*gridSize;
let gridCheckbox,gridOn = true;
let lineThickness = 3;
let events = [],eventCount = 0;
let Xmirror, Ymirror,p;
function setup() {
    cnvHeight = windowHeight-windowHeight*0.1;
    createCanvas(windowWidth, cnvHeight);
    background(255);
    colorPicker = createColorPicker(color(0,255,0));
    gridCheckbox = createCheckbox('GRID?',true);
    gridCheckbox.changed(gridCheck);
    XmirrorCheckBox = createCheckbox('XMirror?',false);
    XmirrorCheckBox.changed(function(){if(this.checked)Xmirror=true;else Xmirror=false;});
    YmirrorCheckBox = createCheckbox('YMirror?',false);
    YmirrorCheckBox.changed(function(){if(this.checked)Ymirror=true;else Ymirror=false;});
    gennyButton = createButton("Generate?");
    gennyButton.mousePressed(generateRandomPattern);
    p=createP("324Undecillions(or 3.24x10^38) possible patterns with mirror x and y");
    drawButtons();
    drawGrid(gridSize);
    drawGuide(guideSize);
}
/*
    graphics
*/
function drawButtons(){
    colorPicker.position(0,cnvHeight+10);
    gridCheckbox.position(100,cnvHeight+10);
    gennyButton.position(200,cnvHeight+10);
    XmirrorCheckBox.position(300,cnvHeight+10);
    YmirrorCheckBox.position(400,cnvHeight+10);
    p.position( 100, cnvHeight+20);
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
    noStroke();
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
    noStroke();
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
    if(gridOn)drawGrid(gridSize);
    drawGuide(guideSize);
}
//adds an event to 'events'
function addEvent(x,y,c){
    events[eventCount] = [];
    events[eventCount][0] = x;
    events[eventCount][1] = y;
    events[eventCount++][2] = c;
}
function add(x,y,c){
    if(y < cnvHeight){
        drawTile(x,y,c);
        addEvent(x,y,c);
        if(Xmirror && !Ymirror){
            var Xmid = windowWidth/2;
            drawTile(Xmid + (Xmid-x),y,c);
            addEvent(Xmid + (Xmid-x),y,c);
        }else if(Ymirror && !Xmirror){
            var Ymid = cnvHeight/2;
            drawTile(x,Ymid + (Ymid-y),c);
            addEvent(x,Ymid + (Ymid-y),c);
        }else if(Xmirror&&Ymirror){
            var Xmid = windowWidth/2;
            var Ymid = cnvHeight/2;
            drawTile(Xmid + (Xmid-x),y,c);
            drawTile(x,Ymid + (Ymid-y),c);
            drawTile(Xmid + (Xmid-x),Ymid + (Ymid-y),c);
            addEvent(Xmid + (Xmid-x),y,c);
            addEvent(x,Ymid + (Ymid-y),c);
            addEvent(Xmid + (Xmid-x),Ymid + (Ymid-y),c);
        }if(gridOn)drawGrid(gridSize);
            drawGuide(guideSize);
    }
}
function mousePressed(){add(mouseX,mouseY,colorPicker.color());}
function gridCheck(){
    if(this.checked()){
        gridOn = true;
        drawGrid(gridSize);
        drawGuide(guideSize);
    }else{
        gridOn = false;
        background(255);
        drawEvents();
        drawGuide(guideSize);
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
/*
    THE GENNY
*/
function generateRandomPattern(){
    let xx = snap(windowWidth/2);
    let yy = snap(cnvHeight/2);
    let s = guideSize/2;
    let cors = [];
    events = [];
    eventCount = 0;
    //picks 4 colors
    for(let x = 0; x < 4; x++)
        cors[x] = color(random(0,255),random(0,255),random(0,255));
    //fills
    for(let x=xx-s; x<xx+s; x+=gridSize)
        for(let y=yy-s; y<yy+s; y+=gridSize){
            add(x,y,cors[round(random(0,3))]);
        }
    
}