import fs from 'fs';
import Header from './header';

export default class Crossword {
  public header?: any;
  public puzzle?: any;
  public details?: any;
  public board?: any;

  constructor(options?: any) {
    this.header = new Header();
    this.puzzle = {};
    this.details = {};
    this.board = {};

    if (options?.fileName) {
      this.decodeSync(options.fileName);
    }
  }

  toJson() {
    return this;
  }

  // private methods
  private decodeSync(fileName: string) {
    const data = fs.readFileSync(fileName);
    return this.decode(data);
  }

  private decode(data: any) {
    this.header.checksum = data.slice(0x00, 0x00 + 0x02).readInt16LE(0);
    this.header.fileMagic = data.slice(0x02, 0x02 + 0x0B).toString();

    this.header.cibChecksum = data.slice(0x0E, 0x0E + 0x02).readInt16LE(0);
    this.header.maskedLowCheckSums = data.slice(0x10, 0x10 + 0x04).toString('hex');
    this.header.maskedHighCheckSums = data.slice(0x14, 0x14 + 0x04).toString('hex');

    this.header.version = data.slice(0x18, 0x18 + 0x04).toString();
    this.header.reserved1C = data.slice(0x1C, 0x1C + 0x02).toString('hex');
    this.header.scrambledChecksum = data.slice(0x1E, 0x1E + 0x02).readInt16LE(0);
    this.header.reserved20 = data.slice(0x20, 0x20 + 0x0C).toString('hex');
    this.header.width = data.slice(0x2C, 0x2C + 0x01).readInt8(0);
    this.header.height = data.slice(0x2D, 0x2D + 0x01).readInt8(0);
    this.header.scrambled = data.slice(0x32, 0x32 + 0x01).readInt8(0) !== 0;
    this.header.numberOfClues = data.slice(0x2E, 0x2E + 0x02).readInt16LE(0);
    this.header.unknownBitmask = data.slice(0x30, 0x30 + 0x02).readInt16LE(0);
    this.header.scambledtag = data.slice(0x32, 0x32 + 0x02).readInt16LE(0);

    // ********************* PUZZLE LAYOUT AND STATE *********************
    const cells = this.header.width * this.header.height;
    const solutionStart = 0x34;
    const solutionEnd = solutionStart + cells;
    const stateStart = solutionEnd;
    const stateEnd = stateStart + cells;

    this.puzzle.solution = data.slice(solutionStart, solutionEnd).toString();
    this.puzzle.state = data.slice(stateStart, stateEnd).toString();

    // ********************* STRING SECTION *********************
    var stringStart = stateEnd;
    var remainder = data.slice(stringStart);
    var fields = ['title', 'author', 'copyright'];
    var clueStart = 0;


    for (var i = 0, j = 0, fieldIndex = 0; i < remainder.length && fieldIndex < fields.length; i++) {
      var caret = remainder[i];
      if (caret === 0) {
        this.header[fields[fieldIndex]] = remainder.slice(j, i).toString();
        j = i + 1;
        fieldIndex++;
      }

      if (fieldIndex === 2) {
        clueStart = i + 1;
      }
    };

    // this.details = {};

    // remainder = data.slice(stringStart + clueStart + 1)
    // remainder = Crossword.splitBufferAtNulls(remainder, 0x00);

    // this.details.clues = [];

    // for (var i = 0; i < this.header.numberOfClues; i++) {
    //   this.details.clues.push(remainder[i].toString());
    // }
  }
};
