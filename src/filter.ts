type MinLetterRequirement = [char: string, count: number];
type LetterPositionRequirement = [char: string, position: number];
interface FilterOptions {
  allowedLength?: number;
  minimumLetters?: MinLetterRequirement[];
  positionalLetters?: LetterPositionRequirement[];
}
export function filterWords(wordList: string[], opts: FilterOptions) {
  const hasMinimumLetters = (word: string, minimumLetters: MinLetterRequirement[]) => {
    for (const [letter, minCount] of minimumLetters) {
      const strCount = countChar(word, letter);
      if (strCount < minCount) return false;
    }

    return true;
  };
  const hasPositionalLetters = (word: string, positionalLetters: LetterPositionRequirement[]) => {
    for (const [letter, position] of positionalLetters) {
      if (position < 0 || position >= word.length || word[position] !== letter) return false;
      if (word[position] !== letter) return false;
    }

    return true;
  };

  return wordList.filter((word) => {
    const downcaseWord = word.toLowerCase();
    if (opts.allowedLength !== undefined && downcaseWord.length !== opts.allowedLength) {
      return false;
    }
    if (
      opts.minimumLetters !== undefined &&
      !hasMinimumLetters(downcaseWord, opts.minimumLetters)
    ) {
      return false;
    }
    if (
      opts.positionalLetters !== undefined &&
      !hasPositionalLetters(downcaseWord, opts.positionalLetters)
    ) {
      return false;
    }

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
