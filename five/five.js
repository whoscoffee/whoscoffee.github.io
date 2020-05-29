class Five{
  constructor(data){
    this.dictionary = new Dictionary(data);
    this.startGame();
  }
  //starts things up
  startGame(){
    this.guessCount = 0;
    //gets legal secret word and turns it into a set
    this.secret = this.dictionary.getLegalSecretWord();
    this.guessedWords = new Set();
    this.cheatCode = "xxxxx";//ignore this line and be a man
    this.events = [];//bassically just printable preprocessed text;
    this.drawUI();
  }
  //draws user interface
  drawUI(){
      text("cheatcode = 'xxxxx'",10,20);
    text("Legal secret word = a five letter word with no matching characters",10,50);
    text("I'm thinking of a five letter word...",10,80);
    var count = 0;
    for(var i = 0; i < this.events.length;i++)
      if(100 +((this.events.length-i)*20) < height)
        text(str(this.events[i]),10,100 +((this.events.length-i)*20));
      else
        resizeCanvas(width,height + 100);
  }
  //adds given guess to list of events
  addGuess(guess){
    if(guess == this.cheatCode)
      this.events[this.events.length] = "Secret Word :"+this.secret;
    else{
      if(guess == this.secret){
        this.guessCount++;
        this.finishedGame(guess);
      }else if(this.guessedWords.has(guess))
        this.events[this.events.length] = "You have already guessed: "+guess;
      else if(this.dictionary.isValidWord(guess)){
        this.guessCount++;
        this.events[this.events.length] = "\t~Matching: " + this.countMatchingLetters(guess);
        this.events[this.events.length] = "\t~In-Place: " + this.countInPlaceLetters(guess);
        this.events[this.events.length] = guess;
        this.guessedWords.add(guess);
      }
      else{
        this.guessedWords.add(guess);
        this.events[this.events.length] = "\t~Not a valid word";
        this.events[this.events.length] = guess;
      }
    }
  }
  //endgame Text UI
  finishedGame(guess){
    //adds to front of events
    this.events[this.events.length] = "CONGRATS, U GUESSES CORRECTLY: "+guess+"\t\tin " + this.guessCount+" tries!";
  }
  // return # of matching letters secret/guess
  countMatchingLetters(guess){
    var count = 0;
    let dont = new Set();
    for (let i = 0; i < guess.length;i++)
      if (this.contains(this.secret, guess[i]) && !dont.has(guess[i])) {
        dont.add(guess[i]);
        count++;
      }
    return count;
  }
  //returns true if str contains c
  contains(str,c){
    for(var i = 0; i < str.length;i++)
      if(str[i] == c)
        return true;
    return false;
  }
  //returns number of inplace characters
  countInPlaceLetters(guess){
    var count = 0;
    for (var i = 0; i < guess.length; i++)
      if (this.secret[i] == guess[i])
        count++;
    return count;
  }
  //clears events and restarts game
  restart(){
    this.events = [];
    this.startGame();
  }
}