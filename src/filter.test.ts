import { filterWords } from './filter';

describe('filterWords', () => {
  it('filters by length', () => {
    const wordList = ['sue', 'Steve', 'Barbara', 'Tyrone'];
    const allowedLength = 6;
    const expected = ['Tyrone'];
    const actual = filterWords(wordList, { allowedLength });

    expect(actual).toEqual(expected);
  });
  it('filters by inclusion of at least a number of letters', () => {
    const wordList = ['sue', 'Steve', 'Barbara', 'Tyrone', 'Chuckeee'];
    const expected = ['Steve', 'Chuckeee'];
    const actual = filterWords(wordList, { minimumLetters: [['e', 2]] });

    expect(actual).toEqual(expected);
  });
  it('filters by inclusion of multiple numbers of letters', () => {
    const wordList = ['sue', 'Steve', 'Barbara', 'Tyrone', 'Chuckeee'];
    const expected = ['Chuckeee'];
    const actual = filterWords(wordList, {
      minimumLetters: [
        ['e', 2],
        ['k', 1],
      ],
    });

    expect(actual).toEqual(expected);
  });
  it('filters by position of a single letter', () => {
    const wordList = ['sue', 'Steve', 'Barbara', 'Tyrone', 'Chuckeee'];
    const expected = ['sue', 'Steve'];
    const actual = filterWords(wordList, { positionalLetters: [['e', 3]] });

    expect(actual).toEqual(expected);
  });
  it('filters by position of multiple letters', () => {
    const wordList = ['sue', 'Steve', 'Barbara', 'Tyrone', 'Chuckeee'];
    const expected = ['Steve'];
    const actual = filterWords(wordList, {
      positionalLetters: [
        ['e', 3],
        ['v', 4],
      ],
    });

    expect(actual).toEqual(expected);
  });
});
