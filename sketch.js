//global variables
let codes = [];
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
    background(255,255,255)
    fill(0)
    textSize(windowWidth*0.05)
    textAlign(CENTER,TOP)
    text("WhosCoffee", 0, 0, windowWidth)
    let heightValue = height/(codes.length+1)
    for(var i = 0; i < codes.length; i++){
        codes[i].position(width/2,heightValue+i*heightValue)
        codes[i].center('horizontal')
        codes[i].style('text-decoration', 'none')
        codes[i].style('color', color(0))//css is basically cancer,change my mind
    }
}
function windowResized(){
    resizeCanvas(windowWidth,windowHeight)
    redRaw()
}