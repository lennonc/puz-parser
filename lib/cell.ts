class Cell {
  x: number;
  y: number;
  letter: string;
  isBlank: boolean;
  acrossClue: number;
  downClue: number

  constructor(x: number, y: number, letter: string) {
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.isBlank = letter === '.';
    this.acrossClue = 0;
    this.downClue = 0;
  }
}

export default Cell;
