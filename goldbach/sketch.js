/*
  GOLDBACHES CONJECTURE
    Every even integer greater than 2 can be 
    expressed as the sum of two primes.
    https://en.wikipedia.org/wiki/Goldbach%27s_conjecture#:~:text=Goldbach's%20conjecture%20is%20one%20of,the%20sum%20of%20two%20primes.
*/
let inputBox,button, events;
function setup() {
  createCanvas(windowWidth,windowHeight);
  background(169);
  inputBox = createInput();
  inputBox.position(10,10);
  button = createButton('submit');
  button.position(inputBox.x + inputBox.width, 10);
  button.mousePressed(submit);
  text("GoldBach's conjecture states thats all even numbers \nover 2 can be expressed by the sum of two prime numbers",300,50);
}
function drawEvents(){
  for(let i = 0; i < events.length;i++){
    text(events[i][0],events[i][1],events[i][2]);
  }
  text("GoldBach's conjecture states thats all even numbers \nover 2 can be expressed by the sum of two prime numbers",300,50);
}
function addEvent(str,x,y){
  let temp = [3];
  temp[0] = str;
  temp[1] = x;
  temp[2] = y;
  events[events.length] = temp;
}
function submit(){
  events = [];
  background(169);
  let set = goldBach(inputBox.value());
  const itr = set.values();
  var str = itr.next();
  let y = 20;
  let count = 2;
  let cnvHeight = height;
  fill(0);
  while(!str.done){
    if (y + (y*count++) > windowHeight)
      cnvHeight += 20;
    addEvent(str.value,10, y + (y*count))
    str = itr.next();
  }
  resizeCanvas(windowWidth,cnvHeight);
  background(169);
  drawEvents();
}
function goldBach(n){
  let primes = getPrimes(n);
  let response = new Set();
  let l = primes.length;
  for(let i = 0; i < l;i++)
    for(let j = l;j > 0;j--)
        if(primes[i]+primes[j] == n)
          if(primes[i] > primes[j])
            response.add(primes[j]+"+"+primes[i]+" = "+n);
          else
            response.add(primes[i]+"+"+primes[j]+" = "+n);
  inputBox.value('');
  return response;
}
function getPrimes(n){
  var primes = [],count = 0;
  for(var i = 0; i < n;i++)
    if(isPrime(i))
      primes[count++] = i;
  return primes;
}
function isPrime(n){
  for(let i = 2; i < 10;i++)
    if(n % i == 0)
      return false
  return true;
}