type MinLetterRequirement = [char: string, count: number];
type LetterPositionRequirement = [char: string, position: number];
interface FilterOptions {
  allowedLength?: number;
  minimumLetters?: MinLetterRequirement[];
  positionalLetters?: LetterPositionRequirement[];
}
export function filterWords(wordList: string[], opts: FilterOptions) {
  const meetsMinimumLetters = (word: string, reqs: MinLetterRequirement[]) =>
    reqs.every(([char, count]) => countChar(word, char) >= count);

  const meetsPositionalLetters = (word: string, reqs: LetterPositionRequirement[]) =>
    reqs.every(([char, pos]) => pos >= 0 && pos < word.length && word[pos] === char);

  return wordList.filter((rawWord) => {
    const word = rawWord.toLowerCase();
    if (opts.allowedLength !== undefined && word.length !== opts.allowedLength) return false;
    if (opts.minimumLetters !== undefined && !meetsMinimumLetters(word, opts.minimumLetters))
      return false;
    if (
      opts.positionalLetters !== undefined &&
      !meetsPositionalLetters(word, opts.positionalLetters)
    )
      return false;

    return true;
  });
}

// Helpers

function countChar(str: string, char: string) {
  if (char.length > 1) {
    throw new Error('char needs to be a single character');
  }

  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  return count;
}
