// THERES A BETTER SIEVE, AND U HAVE IT WRITEN IN JAVA OR PYTHON SOMEWHERE ON PC CHICO!
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
  text("GoldBach's conjecture states thats all even numbers \nover 2 can be expressed by the sum of two prime numbers\n(prints data up to 100,000 and prints validation past that){note: after 1 billion it gets slow}",300,50);
}
function drawEvents(){
  for(let i = 0; i < events.length;i++){
    text(events[i][0],events[i][1],events[i][2]);
  }
  text("GoldBach's conjecture states thats all even numbers \nover 2 can be expressed by the sum of two prime numbers\n(prints data up to 100,000 and prints validation past that){note: after 1 billion it gets slow}",300,50);
}
function addEvent(str,x,y){
  let temp = [3];
  temp[0] = str;
  temp[1] = x;
  temp[2] = y;
  events[events.length] = temp;
}
function submit(){
  events = [];//clears events
  if(inputBox.value()<100000 && inputBox.value()%2==0){
    let arr = goldBach(inputBox.value());
    let l = arr.length, y = 20;
    if(y + (y * l) + 60 > windowHeight)
        resizeCanvas(windowWidth,y + (y * l) + 60);
    fill(0);
    for(var i = 0; i < l;i++)
        addEvent(arr[i], 10, y + (y * i) + 40);
  }else if (inputBox.value()%2==0)
    addEvent(validGoldBach(inputBox.value()),10,60);
  else
    addEvent("Enter an even number please",10,60);
  background(169);
  drawEvents();
}
function validGoldBach(n){
    for(var i = n-1; i > 0;i-=2)
        if(i<8||isPrime(i))
            for(var j = 1;j < n;j+=2)
                if(j<8||isPrime(j))
                    if(i + j == n)
                        return true;
                    else if(i + j > n)
                        j = n;
    return false;
}
function goldBach(n){
  let primes = getPrimes(n);
  let response = [];
  let count = 0;
  let l = primes.length;
  for(let i = l; i > 0;i--)
    for(let j = 0;j < l;j++)
        if(primes[i]+primes[j] == n){
          if(primes[i] > primes[j])
            response[count++] = primes[j]+"+"+primes[i]+" = "+n;
          else
            response[count++] = primes[i]+"+"+primes[j]+" = "+n;
            primes[i] = 0;
            primes[j] = 0;
          j = l;
        }else if(primes[i]+primes[j] > n)
            j = l;
  inputBox.value('');
  return response;
}
//using Sieve of Sundaram
//https://en.wikipedia.org/wiki/Sieve_of_Sundaram
function getPrimes(n){
  let k = (n-2)/2;
  let arr = [k+1];
  for(let i = 1;i<k+1;i++){
    let j = i;
    while((i+j+2*i*j)<= k){//can optimize ?
      arr[i+j+2*i*j] = 1;
      j++;
    }
  }
  let fixedArray = [];
  let count = 0;
  for(let i = 0; i < k+1;i++){
    if(arr[i] != 1){
      fixedArray[count++] = 2*i+1;
    }
  }
  return fixedArray;
}
function isPrime(n){
  if(n%2==0)
    return false;
  for(let i = 3; i < n/2;i+=2)
        if(n % i == 0)
            return false;
  return true;
}