import Crossword from '../lib/crossword';
import Header from '../lib/header';

const fileName = `${__dirname}/fixtures/classic.puz`;
const fileOpts = { fileName };

describe('Crossword', () => {
  it('should parse the file', () => {
    const crossword = new Crossword(fileOpts);
    const json = crossword.toJson();

    expect(json).toHaveProperty('header');
    expect(json.header).not.toBeUndefined();
  });

  it('should have a header section', () => {
    const crossword = new Crossword(fileOpts);
    const json = crossword.toJson();

    expect(crossword.header).toBeInstanceOf(Header);
  })
});
