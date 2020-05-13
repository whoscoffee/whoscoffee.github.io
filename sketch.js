let img, properties;
function setup() {
  createCanvas(windowWidth, windowHeight);
  img = createImage(windowWidth, windowHeight - (windowHeight/8));
  reDrawImg();
  frameRate(5);
  resetImg();
  drawHome();
}
function reDrawImg(){
    img.loadPixels();
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let g = map(x, 0, img.width,100,255);
            let b = map(y, 0, img.height,100,255);
            let a = map(y, 0, img.height, 255, 100);
            img.set(x, y, [0, g, b, a]);
        }
    }
    img.updatePixels();
}
function resetCanvas(){
    resizeCanvas(windowWidth,windowHeight);
    img.resize(windowWidth,windowHeight - (windowHeight/8));
}
function drawHome(){
  drawNav();
  drawNavUI();
}
function drawProjects(){
    //resetCanvas();
    drawNav();
    //snakeGame
    let snake = createA('/SnakeGame/index.html', 'SnakeGame', 'blank');
    snake.style('text-decoration', 'none');
    snake.style('color', color(255,0,255));
    snake.position((windowWidth/6)*2,(windowHeight/9)*1.5);
    //FractalTree
    let fractalTree = createA('/FractalTree/index.html', 'FractalTree', 'blank');
    fractalTree.style('text-decoration', 'none');
    fractalTree.style('color', color(255,0,255));
    fractalTree.position((windowWidth/6)*2,(windowHeight/9)*2);
    //Patterns
    let patterns = createA('/patterns/index.html', 'patterns', 'blank');
    patterns.style('text-decoration', 'none');
    patterns.style('color', color(255,0,255));
    patterns.position((windowWidth/6)*2,(windowHeight/9)*2.5);
}
function drawNav(){
  
  //nav box
  fill(255,0,255);
  rect(0,0,windowWidth, windowHeight/8);
  
  //Title
  fill(0,255,255);
  textAlign(CENTER,TOP);
  textSize(windowWidth*0.05);
  text("WhosCoffee", 0, 0, windowWidth);
}
function drawNavUI(){
    //Home Button
    let home = createButton('Home');
    home.style('background-color', color(255,0,255));
    home.style('color', color(0,255,255));
    home.style('border', 0);
    home.position(windowWidth/6,windowHeight/12);
    home.mousePressed(drawHome);
  
    //Projects Button
    let projects = createButton('Projects');
    projects.style('background-color', color(255,0,255));
    projects.style('color', color(0,255,255));
    projects.style('border', 0);
    projects.position((windowWidth/6)*2,windowHeight/12);
    projects.mousePressed(drawProjects);
}
function drawArticle(){
    fill(255,0,255);
    text("Hello, this is whoscoffee,\n this website is made purely by using p5.js.\n i hope u enjoy", windowWidth/2,windowHeight/2);
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
function draw(){
    image(img,0,windowHeight/8);
    if (frameCount % 5 == 0)
        resetImg();
    else
        alphaDeaden(0,20,properties[0],properties[1]);
        
    drawArticle();
}

function alphaDeaden(start, end, size, isVertical){
  let rando;
  
  img.loadPixels();
  
  //this is the vertical way
  if(isVertical)
    for(let x = 0; x < 4*img.width;x+=4){//goes across top
      let r = 4*round(random(1,size))
      for(let y = 0; y < img.height;y+=r)//goes down
        if(size == 1)
          img.pixels[x+(4*y*img.width)+3] = random(start,end);
        else{
          rando = random(start,end);
          for(let i = 0; i < r;i++)
            img.pixels[x+(4*y*img.width)+(4*i*img.width)+3] = rando;
        }
    }
  //this is the horizontal way
  else
    for(let i = 0; i < 4*img.width*img.height;i+=4*size)//for every pixel(normal way)
      if(size == 1)
        img.pixels[i+3] = random(start,end);
      else{
        rando = random(start,end);
        for(let j = 0; j < size;j++)
          img.pixels[i+3+(4*j)] = rando;
      }
  
  img.updatePixels();
  
}
function windowResized(){
    //resizeCanvas(windowWidth, windowHeight);
    resetCanvas();
    reDrawImg();
    background(0,255,255);
    drawNav();
    drawArticle();
}