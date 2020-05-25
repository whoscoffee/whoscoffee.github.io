//reference math
//http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates
// also the data used in this program
// was provided by jeffery bergamini
// and is publically avaible at http://jeff.cis.cabrillo.edu/datasets/santa-cruz-addresses.txt
// not sure if he approves of me using it on my personal website
// note to self:
// contact jeff
let result,inp;
function preload() {
  result =loadStrings('addresses.txt');
}
function setup(){
  inp = createInput('');
  inp.attribute('placeholder', 'Address here');
  inp.input(find);
  createCanvas(windowWidth,windowHeight);
  background(255);
  parse();//parses data into more arrays
  
  text("type in an address below within the santa cruz county, \nand i will return every address within a radius of one KM",width/2,height/2);
}
//search function, returns a address array given a string
function getAddress(str){
  var max = 0, count = 0,index;
  str = str.toUpperCase();
  for(let i = 0; i < result.length;i++){//for all results
      count = 0;
    for(let j = 0; j < str.length;j++)
      if(result[i][2][j] == str[j])
        count++;
    if(count >= max){
      max = count;
      index = i;
    }
  }return result[index];
}
function parse(){
  for (let i = 0; i < result.length;i++)
    result[i] = result[i].split("\t");
}
function getAddressesInArea(x,y,dist){
  let temp,xx,yy,count = 0;
  let addresses = [];
  x *= PI/180;
  y *= PI/180;
  for(var i = 0; i < result.length;i++){
    xx = result[i][0] * PI/180;
    yy = result[i][1] * PI/180;
    temp = Math.acos(Math.sin(x)*Math.sin(xx)+Math.cos(x)*Math.cos(xx)*Math.cos(y-yy))*6371
    if(temp < dist){
      addresses[count] = [];
      addresses[count][0] = result[i][0];
      addresses[count][1] = result[i][1];
      addresses[count][2] = result[i][2];
      addresses[count++][3] = temp;
    }
  }
  return sortAddressesByDist(addresses);
}
function sortAddressesByDist(addresses){
  var temp,sorted = false;
  while(!sorted){
    sorted = true;
    for(let i = 1; i < addresses.length;i++)
      if(addresses[i][3] < addresses[i-1][3]){
        sorted = false;
        temp = addresses[i];//remember
        addresses[i] = addresses[i-1];//swap
        addresses[i-1] = temp;//replace
      }
  }
  return addresses
}
function find(){
  print(this.value());
  let addy = getAddress(this.value());
  let addys = getAddressesInArea(addy[0],addy[1],1);
  print(addys.length);
  background(255);
  text("given address:"+addy,10,10);
  text("addresses in area: \n",10,30);
  text("got "+addys.length+" results",10,40);
  let l;
  if(addys.length > 50){
    l = 50
    text("only shows up to 50",10,50);
  }else 
    l = addys.length;
  for(let i = 0; i < l;i++){
    if (60+(60*i) >= height)
      resizeCanvas(width, height+100);
    text("address: "+addys[i][2]+"\n\t*lat: "+addys[i][0]+"\n\t*long: "+addys[i][1]+"\n\t*distance in km: "+addys[i][3],10,60+(60*i));
  }
}
function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    text("type in an address below within the santa cruz county, \nand i will return every address within a radius of one KM",windowWidth/2,windowHeight/2);
}