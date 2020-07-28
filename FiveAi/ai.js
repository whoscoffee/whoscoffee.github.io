class Ai {
  /*
    wordData should ba an array of 5 digit words
  */
  constructor(wordData){
    this.invalidCharacters = new Set();
    this.knownCharacters = [];
    this.guessData = [];
    this.dictionary = new Dictionary(wordData);
    this.validWords = new Set();
    var temp = this.dictionary.getSecrets();
    for(var i = 0; i < temp.length;i++)
      this.validWords.add(temp[i]);
  }
  /*
    makes/returns guess
  */
  makeGuess(lastMatching,lastInplace){
    var guess = round(random(0, this.validWords.size));
    const itr = this.validWords.values();
    for(var i = 0; i <= guess;i++)
      if(i == guess)
        guess = itr.next().value;
      else
        itr.next();
    this.validWords.delete(guess);
    
    if(this.guessData.length >= 1){
      this.guessData[this.guessData.length-1][1] = lastMatching;
      this.guessData[this.guessData.length-1][2] = lastInplace;
      
      print("choose-able words: "+ this.validWords.size);
      
      this.updateData();
    }
    this.guessData[this.guessData.length] = [];
    this.guessData[this.guessData.length-1][0] = guess;
    return guess
  }
  /*
    bassically iterates data and checks whats invalid and known
  */
  updateData(){
    var clean = false;
    if (this.guessData.length > 1)
      for(var i = 0; i < this.guessData.length-1;i++){
        if(this.guessData[i][1] == 0){//adds characters to invalid characters if true
          for(var j = 0; j < this.guessData[i][0].length;j++)
            this.invalidCharacters.add(this.guessData[i][0][j]);
          clean = true;
        }else if(this.guessData[i][1] === 5){//if all 5 are matching, we can use them as know characters
          if(this.knownCharacters.length == 0)
            this.knownCharacters = this.guessData[i][0];
          clean = true;
        }
        //finds the 5th known character if i know 4
        //if(this.guessData[i][2] == 4)
          //this.findOutCast()//this needs to be changed as for i belive it will return a boolean
        
      }
    if(clean){
      this.cleanWords();
      //this.cleanGuesses();
    }
  }
  /*
    finds words that are invalid and deletes them from VALIDWORDS set
  */
  cleanWords(){
    const itr = this.validWords.values();
    var w = itr.next();
    //for every validWord in iterator
    while(!w.done){
      let word = w.value;
      //filters out every word that doesnt cointain the 5 matching letters if existent
      if(this.knownCharacters.length == 5){//if i know all the characters then just filter
        let knownLetters = new Set(this.knownCharacters);
        for(let i = 0; i < word.length;i++)
          if(!knownLetters.has(word[i]))//if knownletters does not cointain character
            this.validWords.delete(word);
      }
      //deletes words with invalid character if any exist
      if(this.invalidCharacters.size > 0)
        for(var i = 0; i < word.length;i++)//if word contains one invalid character, then dirty = true
          if(this.invalidCharacters.has(word[i])){
            this.validWords.delete(word);
            i = word.length;//basically break
          }
      w = itr.next();//get next valid word
    }
  }

  findOutcast(guessData){
    if(this.invalidCharacters.size == 22)
      this.knownCharacters = this.alphabetSubtraction();
  }
  /*
    returns every character from the alphabet that isnt in invalidcharacters[]
  */
  alpabetSubtraction(){
    var temp = new Set(this.invalidCharacters);
    var knownCharacters = [];
    for(var c = 'a'; c < 'z';c++)
      if(!temp.has(c))
        knownCharacters[knownCharacters.length] = c;
    return knownCharacters;
  }
}