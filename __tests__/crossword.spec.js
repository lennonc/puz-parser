const Crossword = require('../lib/crossword');

const fileName = `${__dirname}/fixtures/classic.puz`;
const fileOpts = { fileName };

describe('Crossword', () => {
  it('should parse the file', () => {
    const crossword = new Crossword(fileOpts);
    const json = crossword.toJson();
    expect(json).toHaveProperty('header');
    expect(json.header).not.toBeUndefined();
  });
});
