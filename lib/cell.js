module.exports = class Cell {
  constructor(x, y, letter) {
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.isBlank = letter === '.';
    this.accrossClue;
    this.downClue;
  }
}
