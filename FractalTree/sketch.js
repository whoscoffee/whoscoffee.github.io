let angle, iterations, adj, fractalSize, thinness;
let angleSlider, iterationsSlider, randomSlider, sizeSlider;
let thinnessSlider;
let paused = false;
function setup() { 
  createCanvas(windowWidth, windowHeight - 100);
  angleSlider = createSlider(0, 2 * PI, PI / 9, 0.01);
  angleSlider.position(10, height);
  iterationsSlider = createSlider(3, 10, 3);
  iterationsSlider.position(150, height);
  randomSlider = createSlider(0, 35, 7);
  randomSlider.position(290, height);
  sizeSlider = createSlider(50, 80, 75);
  sizeSlider.position(10, height + 20);
  thinnessSlider = createSlider(5, 15, 10);
  thinnessSlider.position(150, height + 20);
  frameRate(2);
} 
function draw() { 
  if(!paused){
    background(0);
    angle = angleSlider.value();
    iterations = iterationsSlider.value();
    adj = randomSlider.value()/100;
    fractalSize = sizeSlider.value()/100;
    thinness = thinnessSlider.value();
    translate(width/2, height);
    branch(100);
    paused = true;
  }
}
function keyPressed(){
  if (keyCode == 32)//space
    if(paused)
      paused = false;
}
function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > iterations){
    if(len*fractalSize <= iterations){
      strokeWeight(1);
      stroke(0,255,0);
      triangle(-len/2,-len/2,0,0,len/2,-len/2);
    }else{
      strokeWeight(len/thinness);
      stroke(55,25,15);
      push();
      rotate(angle + random(-adj, adj));
      branch(len * (fractalSize + random(-adj, adj)));
      pop();
      push();
      rotate(-angle + random(-adj, adj));
      branch(len * (fractalSize + random(-adj, adj)));
      pop();  
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight-100);
}