function setup() {
  createCanvas(windowWidth, windowHeight)
  img = createImage(width, height)
  setColor();
  reDrawImg();//makes init img
  resetImg();//inits
  pixelDensity(1)
  //frameRate(60)
}
function reDrawImg(){
    img.loadPixels();
    for (var x = 0; x < img.width; x++) {
        for (var y = 0; y < img.height; y++) {
            if (y<height/8) img.set(x,y,[r,g,b,255])
            else{
                var a = map(y, 0, img.height, 255, 0)
                img.set(x, y, [r, g, b, a])
            }
        }
    }
    img.updatePixels()
}
function resetImg(){
    properties = [];
    properties[0] = round(random(0,width/8));
    let temp = random(-1,1);
    if (temp > 0)
        properties[1] = true;
    else 
        properties[1] = false;
}
/*
    graphics
*/
//places circles on img with rgb colors
function radialAlphaEnner(x,y,radius){
    let startX = x-radius, startY = y-radius
    let endX = x+radius, endY = y+radius, a
    img.loadPixels()
    for(var xx = startX; xx < endX;xx++)//makes circle
        for(var yy = startY; yy < endY;yy++)
            if(distanceFrom(x,y,xx,yy) <= radius){//majic part
                    a = map(distanceFrom(x,y,xx,yy), 0, radius, 255, 0)
                    img.set(xx,yy,[r,g,b,a])
                }
    img.updatePixels();
}
//takes img and does the thing to it
function alphaDeaden(start, end, size, isVertical){
    let rando
    img.loadPixels()
    if(isVertical)//this is the vertical way
        for(var x = 0; x < 4*img.width;x+=4){//goes across top
            var r = 4*Math.round(Math.random()*size)+1
            for(var y = 0; y < img.height;y+=r)//goes down
                if(size == 1)
                    img.pixels[x+(4*y*img.width)+3] = Math.round(Math.random()*end)+start
                else{
                    rando = Math.round(Math.random()*end)+start
                    for(var i = 0; i < r;i++)//makes streeks
                        img.pixels[x+(4*y*img.width)+(4*i*img.width)+3] = rando
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
//returns dist between 2 (x,y)cooridinates
function distanceFrom(startX,startY,endX,endY){
    let x = endX - startX
    let y = endY - startY//its not one line for a reason; dont fix it
    return x*x+y*y
}
//changes rgb colors of those circles
function mousePressed(){setColor();}
function windowResized(){
    //###resets positions
    //image
    resizeCanvas(windowWidth,windowHeight)
    img.resize(width,height)
    //&&&resets positions
    background(0,255,255)
    reDrawImg()
}
function setColor(){
    r = Math.random()*255
    g = Math.random()*255
    b = Math.random()*255
}
function draw(){
  image(img,0,0)
  if(frameCount%5==0){
    resetImg()
    alphaDeaden(0,20,properties[0],properties[1])
  }else if(frameCount%4==0){
    radialAlphaEnner(Math.round(Math.random()*width),
                     Math.round(Math.random()*height),width)
    }else if(frameCount%3==0)
        alphaDeaden(0,20,properties[0],properties[1])
}