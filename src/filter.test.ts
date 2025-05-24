import { filterWords } from './filter';

describe('filterWords', () => {
  it('filters by length', () => {
    const wordList = ['sue', 'Steve', 'Barbara', 'Tyrone'];
    const allowedLength = 6;
    const expected = ['Tyrone'];
    const actual = filterWords(wordList, { allowedLength });

    expect(actual).toEqual(expected);
  });
});
