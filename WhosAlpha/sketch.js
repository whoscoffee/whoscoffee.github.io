/*
  This is an image filter program
  #####################
  Made by Jacob Burgess
  #####################
  seing what i can do at the moment
*/
let img;

function preload(){
  img = loadImage('img.jpg');
}
function setup(){
  cnv = createCanvas(img.width,img.height);
 image(img,0,0);
  textSize(img.height * .05);
  textAlign(CENTER);
  text("s to save", img.width/2, img.height/2);
  text("space to filter", img.width/2, img.height/2+(img.height*.05));
  
}
//deadens alpha values(size must be more than or equal to 1 and smaller than height or width(whichever is smallest))
function alphaDeaden(start, end, size, isVertical){
  let rando;
  img.loadPixels();
  //this is the vertical way
  if(isVertical)
    for(let x = 0; x < 4*img.width;x+=4)//goes across top
      for(let y = 0; y < img.height;y+=size)//goes down
        if(size == 1)
          img.pixels[x+(4*y*img.width)+3] = random(start,end);
        else{
          rando = random(start,end);
          for(let i = 0; i < size;i++)
            img.pixels[x+(4*y*img.width)+(4*i*img.width)+3] = rando;
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
function draw(){
  if(keyIsDown(32)){//space key

    //adjust me
    //###########################
    alphaDeaden(0,20,15,false);
    //#####################


    image(img,0,0);//to display image
  }
  if(keyIsDown(83))// 's' key stands for SaveImage
    save('myCanvas.jpg');
}