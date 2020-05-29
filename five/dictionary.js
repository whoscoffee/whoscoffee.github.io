//this class was made specifically for a text file filled with 5 letter words
//the list can be found here:
//http://www.cabrillo.edu/~shodges/cs20j/progs/cinco-words.txt
class Dictionary{
  constructor(data){
    this.data = data;
    this.words = new Set();
    this.secrets = [];
    this.parse();
  }
  
  //parses data into words and secrets
  parse(){
    for(var i = 0; i < this.data.length;i++){
      this.words.add(this.data[i]);
      if(this.isLegalSecretWord(this.data[i])){
        this.secrets[this.secrets.length] = this.data[i];
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