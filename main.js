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

  // Method to play game
  play() {

    // Increments/decrements counters for position on field
    while (this.gameOver === false) {
      this.print(); // Prints field
      let direction = prompt('Which way (u, d, l, r)?');
      direction = direction.toLowerCase(); // So switch statement works properly
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

        // Updates characters based on movement
      
        switch(this.currentPosition) {
          case fieldCharacter:
            this.fieldArrays[this.indexY][this.indexX] = pathCharacter;
            break;
          case hole:
            console.log('Sorry, you fell in a hole!');
            this.fieldArrays[this.indexY][this.indexX] = 'X';
            this.print();
            this.gameOver = true;
            break;
          case hat:
            console.log('Congrats, you won!!!');
            this.fieldArrays[this.indexY][this.indexX] = 'X';
            this.print();
            this.gameOver = true;
            break;
          case pathCharacter:
            this.fieldArrays[this.indexY][this.indexX] = '✱';
            break;
          default:
            console.log('Sorry, you went out of bounds');
            this.gameOver = true;
            break;
        } 
      } catch (e) {
        console.log('Sorry you went out of bounds');
        this.gameOver = true;
        }
    }
  }

}


// Class instance to test
const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

// Starts game
myField.play();