function setup() {
  drawHome();
}
function drawHome(){
  createCanvas(windowWidth, windowHeight);
  background(0,255,255);
  drawNav();
  drawNavUI();
  drawArticle();

}
function drawProjects(){
    createCanvas(windowWidth, windowHeight);
    background(0,255,255);
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
    //WhosAlpha?
    let whosAlpha = createA('/WhosAlpha/index.html', 'WhosAlpha?', 'blank')
    whosAlpha.style('text-decoration', 'none');
    whosAlpha.style('color', color(255,0,255));
    whosAlpha.position((windowWidth/6)*2,(windowHeight/9)*2.5);
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
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    background(0,255,255);
    drawNav();
    drawArticle();
}