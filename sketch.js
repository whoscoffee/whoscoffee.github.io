var img, properties;
p5.disableFriendlyErrors = true;
var r,g,b;
var home, projects,snake,fractalTree,patterns;
function setup() {
  createCanvas(windowWidth, windowHeight);
  img = createImage(windowWidth, windowHeight);
  r = Math.random()*255;
  g = Math.random()*255;
  b = Math.random()*255;
  reDrawImg();//makes init img
  resetImg();//inits
  //UI
  home = createButton('Home'), 
  projects = createButton('Projects');
  snake = createA('/SnakeGame/index.html', 'SnakeGame', 'blank');
  fractalTree = createA('/FractalTree/index.html', 'FractalTree', 'blank');
  patterns = createA('/patterns/index.html', 'patterns', 'blank');
  drawUI();
  frameRate(10);
}
//ree's
function reDrawImg(){
    img.loadPixels();
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            if (y<windowHeight/8)
                img.set(x,y,[r,g,b,255]);
            else{
                //let g = map(x, 0, img.width,100,255);
                //let b = map(y, 0, img.height,100,255);
                let a = map(y, 0, img.height, 255, 0);
                img.set(x, y, [r, g, b, a]);
            }
        }
    }
    img.updatePixels();
}
function resetCanvas(){
    //image
    resizeCanvas(windowWidth,windowHeight);
    img.resize(windowWidth,windowHeight);
    //Nav and Title
    home.position(windowWidth/16,windowHeight/24);
    projects.position((windowWidth/4),windowHeight/24);
    //projects
    snake.position((windowWidth/6)*2,(windowHeight/9)*1.5);
    fractalTree.position((windowWidth/6)*2,(windowHeight/9)*2);
    patterns.position((windowWidth/6)*2,(windowHeight/9)*2.5);
}
function resetImg(){
    properties = [];
    properties[0] = round(random(0,windowWidth/8));
    let temp = random(-1,1);
    if (temp > 0)
        properties[1] = true;
    else 
        properties[1] = false;
}
//draw
function drawProjects(){
    //snakeGame
    snake.style('text-decoration', 'none');
    snake.style('color', color(255,255,255));
    snake.position((windowWidth/6)*2,(windowHeight/9)*1.5);
    //FractalTree
    fractalTree.style('text-decoration', 'none');
    fractalTree.style('color', color(255,255,255));
    fractalTree.position((windowWidth/6)*2,(windowHeight/9)*2);
    //Patterns
    patterns.style('text-decoration', 'none');
    patterns.style('color', color(255,255,255));
    patterns.position((windowWidth/6)*2,(windowHeight/9)*2.5);
}
function drawText(){
    fill(255,255,255);
    textAlign(CENTER,TOP);
    textSize(windowWidth*0.05);
    text("WhosCoffee", 0, 0, windowWidth);
    fill(255,255,255);
    text("Hello, this is whoscoffee,\n this website is made purely by using p5.js.\n i hope u enjoy\nclick anywhere ;)", windowWidth/2,windowHeight/2);
}
function drawUI(){
    //Title
    fill(255,255,255);
    textAlign(CENTER,TOP);
    textSize(windowWidth*0.05);
    text("WhosCoffee", 0, 0, windowWidth);
    //Home Button
    home.style('background-color', color(0,0,0,0));
    home.style('color', color(255,255,255));
    home.style('border', 0);
    home.style('font-size', "200%");
    home.position(windowWidth/16,windowHeight/24);
    //home.mousePressed(drawUI);
    //Projects Button
    projects.style('background-color', color(0,0,0,0));
    projects.style('color', color(255,255,255));
    projects.style('border', 0);
    projects.style('font-size', "200%");
    projects.position((windowWidth/4),windowHeight/24);
    projects.mousePressed(drawProjects);
    fill(255,255,255);
    text("Hello, this is whoscoffee,\n this website is made purely by using p5.js.\n i hope u enjoy", windowWidth/2,windowHeight/2);
}
function draw(){
    image(img,0,0);
    if(frameCount%5==0){
        resetImg();
        alphaDeaden(0,20,properties[0],properties[1]);
        drawText();
    }else if(frameCount%4==0){
        radialAlphaEnner(Math.round(Math.random()*windowWidth), Math.round(Math.random()*windowHeight),windowWidth);
        drawText();
    }else if(frameCount%3==0){
        alphaDeaden(0,20,properties[0],properties[1]);
        drawText();
    }
}
//imageing
function radialAlphaEnner(x,y,radius){
    var startX = x-radius, startY = y-radius;
    var endX = x+radius, endY = y+radius, a;
    img.loadPixels();
    for(var xx = startX; xx < endX;xx++)//makes circle
        for(var yy = startY; yy < endY;yy++)
            if(distanceFrom(x,y,xx,yy) <= radius){//majic part
                    a = map(distanceFrom(x,y,xx,yy), 0, radius, 255, 0);
                    img.set(xx,yy,[r,g,b,a]);
                }
    img.updatePixels();

}
function alphaDeaden(start, end, size, isVertical){
  var rando;
  img.loadPixels();
  if(isVertical)//this is the vertical way
    for(var x = 0; x < 4*img.width;x+=4){//goes across top
      var r = 4*Math.round(Math.random()*size)+1;
      for(var y = 0; y < img.height;y+=r)//goes down
        if(size == 1)
          img.pixels[x+(4*y*img.width)+3] = Math.round(Math.random()*end)+start;
        else{
          rando = Math.round(Math.random()*end)+start;
          for(var i = 0; i < r;i++)//makes streeks
            img.pixels[x+(4*y*img.width)+(4*i*img.width)+3] = rando;
        }
    }
  else//this is the horizontal way
    for(var i = 0; i < 4*img.width*img.height;i+=4*size)//for every pixel(normal way)
      if(size == 1)
        img.pixels[i+3] = Math.round(Math.random()*end)+start;
      else{
        rando = Math.round(Math.random()*end)+start;
        for(var j = 0; j < size;j++)//makes streeks
          img.pixels[i+3+(4*j)] = rando;
      }
  
  img.updatePixels();
  
}
//math
function distanceFrom(startX,startY,endX,endY){
    //its not one line for a reason; dont fix it
    let x = endX - startX;
    let y = endY - startY
    return x*x+y*y;
}
//events
function mousePressed(){
    r = Math.random()*255;
    g = Math.random()*255;
    b = Math.random()*255;
}
function windowResized(){
    //resizeCanvas(windowWidth, windowHeight);
    resetCanvas();
    background(0,255,255);
    reDrawImg();
}