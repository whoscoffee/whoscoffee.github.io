//this class was made specifically for a text file filled with 5 letter words
//the list can be found here:
//http://www.cabrillo.edu/~shodges/cs20j/progs/cinco-words.txt
class Dictionary{
  constructor(wordData){
    this.words = new Set();//all words
    this.secrets = [];//all valid secret words
    this.parse(wordData);
  }
  getSecrets(){return this.secrets;}
  getWords(){return this.words;}
  //parses wordData into words and secrets
  parse(wordData){
    for(var i = 0; i < wordData.length;i++){
      this.words.add(wordData[i]);
      if(this.isLegalSecretWord(wordData[i])){
        this.secrets[this.secrets.length] = wordData[i];
      }}
  }
  // is word in the dictionary?
  isValidWord(word){
    if (this.words.has(word))
      return true;
    else
      return false;
  }
  // get a legal secret word from the dictionary
  getLegalSecretWord(){
    return this.secrets[round(random(0,this.secrets.length))];
  }
  // is this word a legal secret word?
  isLegalSecretWord(word){
    for (var i = 0; i < word.length; i++)
      for (var j = i + 1; j < word.length; j++)
        if (word[i] == word[j])
          return false;
    return true;
    }
}