let home,projects,div;
function setup() {
  drawHome();
}
function drawHome(){
  createCanvas(windowWidth, windowHeight);
  background(0,255,255);
  drawNav();
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
  
  //NavItems
  
  //Home Button
  home = createButton('Home');
  home.style('background-color', color(255,0,255));
  home.style('color', color(0,255,255));
  home.style('border', 0);
  home.position(windowWidth/6,windowHeight/12);
  home.mousePressed(drawHome);
  
  //Projects Button
  projects = createA('/SnakeGame/index.html', 'Projects', 'blank');
  projects.style('text-decoration', 'none');
  projects.style('color', color(0,255,255));
  projects.position((windowWidth/6)*2,windowHeight/12);
  
}
function windowResized(){
        resizeCanvas(windowWidth, windowHeight);
}