const prompt = require('prompt-sync')({sigint: true});

// Path variables
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// Class setup 
class Field {
  constructor(fieldArrays) {
    this._fieldArrays = fieldArrays;
    this._indexY = 0;
    this._indexX = 0;
    this._gameOver = false;
    this._currentPosition = this._fieldArrays[this._indexY][this._indexX];
  }

  // Getters
  get fieldArrays() {
    return this._fieldArrays;
  }

  get indexY() {
    return this._indexY;
  }

  get indexX() {
    return this._indexX;
  }

  get gameOver() {
    return this._gameOver;
  }

  get currentPosition() {
    return this._currentPosition;
  }

  // Setters 

  set fieldArrays(newArray) {
    this._fieldArrays = newArray;
  }

  set indexY(newIndex) {
    this._indexY = newIndex;
  }

  set indexX(newIndex) {
    this._indexX = newIndex;
  }

  set gameOver(newStatus) {
    this._gameOver = newStatus;
  }

  set currentPosition(newPosition) {
    this._currentPosition = newPosition;
  }

  // Method to print field
  print() {
    this.fieldArrays.forEach(element => console.log(element.join(' ')));
  }
  
  // Static method to generate field
  static generateField(width, height, holePercentage) {

    const newArray = [];  
    let subArray = [];  

    // Generating random characters 
    const numOfCharacters = width * height; 
    const numOfHoles = numOfCharacters * holePercentage / 100;
    const numOfFieldChars = numOfCharacters - numOfHoles;  
    const randArray = [];

    for (let i = 0; i < numOfHoles; i++) {    
      randArray.push(hole);
    }
    for (let i = 0; i < numOfFieldChars; i ++) {
      randArray.push(fieldCharacter);
    }
    
    // Pushing random array items to subArray
    while (subArray.length < width) {
      const randomIndex = Math.floor(Math.random() * randArray.length);
      const splice = randArray.splice(randomIndex, 1);
      subArray.push(splice);
      if (subArray.length === width) {
        newArray.push(subArray);
        subArray = [];
      }
      if (newArray.length === height) {
        break;
      }
    }
    
    // Setting starting point
    newArray[0][0] = [pathCharacter];
    
    // Random hat placement
    const generateRandomHeight = () => {
      const randomHeight = Math.floor(Math.random() * height);
      return randomHeight;
    };
    
    const generateRandomWidth = () => {
      const randomWidth = Math.floor(Math.random() * width);
      return randomWidth;
    }
    
    newArray[generateRandomHeight()][generateRandomWidth()] === [pathCharacter] ? newArray[generateRandomHeight()][generateRandomWidth() + 1] = [hat] : newArray[generateRandomHeight()][generateRandomWidth()] = [hat];
    
    return newArray;
      
  }

  // Method to play game
  play() {

    // Increments/decrements counters for position on field
    while (this.gameOver === false) {
      this.print(); // Prints field
      let direction = prompt('Which way (u, d, l, r)?');
      direction = direction.toLowerCase(); // To match user input to switch statement
      try {
        switch(direction) {
          case "d":
            this.indexY++;
            break;
          case "u":
            this.indexY--;
            break;
          case "l":
            this.indexX--;
            break;
          case "r":
            this.indexX++;
            break;
        }

        this.currentPosition = this.fieldArrays[this.indexY][this.indexX];
        const currentItem = this.currentPosition.shift();

        // Updates characters based on movement
      
        switch(currentItem) {
          case fieldCharacter:
            this.fieldArrays[this.indexY][this.indexX] = [pathCharacter];
            break;
          case hole:
            console.log('Sorry, you fell in a hole!');
            this.fieldArrays[this.indexY][this.indexX] = 'X';
            this.gameOver = true;
            this.print();
            break;
          case hat:
            console.log('Congrats, you won!!!');
            this.fieldArrays[this.indexY][this.indexX] = 'X';
            this.gameOver = true;
            this.print();
            break;
          case pathCharacter:
            console.log(`You've already been here`);
            this.fieldArrays[this.indexY][this.indexX] = '✱';
            break;
          default:
            console.log(currentItem);
            console.log('Sorry, you went out of bounds');
            break;
        } 
      } catch (e) {
        console.log('Sorry, you went out of bounds');
        this.gameOver = true;
        }
    }
  }

}


// Class instance to test
const myField = new Field(Field.generateField(10, 10, 25));

// Starts game
myField.play();