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

  /*delete me (UPGRADES PEOPLE)
  called on by sketch
  printShit(times){
      console.log("****************************************");
      console.log("guessNumber"+times);
      if(this.knownCharacters.length>0){
        console.log("knownCharacters:");
        for(var i = 0; i < this.knownCharacters.length;i++)
            console.log("\t-"+this.knownCharacters[i]);
      }else console.log("knownCharacters empty");
      if(this.invalidCharacters.size>0){
        console.log("invalidCharacters:");
        const itr = this.invalidCharacters.values();
        var c = itr.next();
        while(!c.done){
            var car = c.value;
            console.log("\t-"+car);
            c = itr.next();
        }
      }else console.log("invalidCharacters empty");
    console.log("****************************************");
  }


  
    slims up guesses
  
    cleanGuesses(){
        var data = this.guessData;
        for(let i = 0; i < data.length;i++){//for each word
            var word = data[i][0];
            for(let j = 0; j < word.length;j++){//for each character
                if(this.invalidCharacters.has(word[j]))//contain invalid character
                    word[j] = ' ';//replace invalid character with this
            }
            data[i][0] = word;
        }
        this.guessData = data;
        console.log("GuessData:");
        for(let i = 0; i < data.length;i++)
            console.log(data[i][0]);
  }
  
    given a word with 4-matching characters
    this function iterates previous word data
    and adds all 5 matching characters in known characters
    but only if it finds a 5th character
    else returns false
    
    so if we know 4 of these 5 characters is matching
    then chances are, some will be in place
    so if any are in place, then iterate thro
    data and check if any other words can confirm
    which character is in place(giveing us more data)
    
    also if i know whats in place i can remove it from the possibility plane
    
    other things to iterate: 
    
      known matching characters
      invalid characters
  */
  findOutcast(guessData){
    // guess = guessData[0];
    // inPlace = guessData[1];
    // matching = guessData[2]
    if(this.invalidCharacters.size == 22){
      this.knownCharacters = this.alphabetSubtraction();
    }else{
    
    }
    
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