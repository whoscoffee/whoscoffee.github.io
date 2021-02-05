let codes = [];
let titleColor = [0,0,0];
let clickCount = 0;
function setup() {
    createCanvas(windowWidth, windowHeight)
    addLink('/SnakeGame/index.html')
    addLink('/FractalTree/index.html')
    addLink('/patterns/index.html')
    addLink('/SantaCruzAddresses/index.html')
    addLink('/five/index.html')
    addLink('/FiveAi/index.html')
    addLink('/goldbach/index.html')
    addLink('/alphaVisual/index.html')
    addLink('/RollingCircle/index.html')
    addLink('/RollingWorm/index.html')
    redRaw();
}
function addLink(str){
    let index,subStr = [];
    for(var i = 1; i < str.length; i++) if(str[i] == '/') index = i-1//basically a custom delimiter
    for(i = 0; i < index; i++) subStr[i] = str[1+i]//creates a substring of directory name
    codes[codes.length] = createA(str, join(subStr, ''), 'Blank')//makes the element
}

//helper function for draw
function redRaw(){
    background(255-titleColor[0] ,255-titleColor[1],255-titleColor[2])
    let titleSize = height*0.05
    fill(titleColor)
    textSize(titleSize)
    textAlign(CENTER,TOP)
    text("WhosCoffee", 0, 0, width)
    let heightValue = (height-titleSize)/(codes.length)
    for(var i = 0; i < codes.length; i++){
        codes[i].position(width/2,heightValue+i*heightValue)
        codes[i].center('horizontal')
        codes[i].style('text-decoration', 'none')
        codes[i].style('color', color(titleColor))//css is basically cancer,change my mind
    }
}
function draw(){
    titleColor[0] = map(mouseX,0,width,0,255)
    titleColor[1] = map(mouseY,0,height,0,255)
    titleColor[2] = (clickCount*10)%255
    redRaw();
}
function mouseClicked(){
    clickCount++;
}
function windowResized(){
    resizeCanvas(windowWidth,windowHeight)
    redRaw()
}