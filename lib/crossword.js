const fs = require('fs');

const decodeSync = Symbol('decodeSync');
const decode = Symbol('decode');
module.exports = class Crossword {
  constructor(options) {
    this.header = {};
    this.puzzle = {};
    this.details = {};
    this.board = {};

    if (options && options.fileName) {
      this[decodeSync](options.fileName);
    }
  }

  toJson() {
    return this;
  }

  // private methods
  [decodeSync](fileName) {
    const data = fs.readFileSync(fileName);
    return this[decode](data);
  }

  [decode](data) {
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
    this.puzzle.state = data.slice(stateStart, stateEnd);
  }
};
