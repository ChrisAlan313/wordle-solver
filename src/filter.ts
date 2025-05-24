import { readFile, writeFile } from 'node:fs/promises';

interface FilterOptions {
  allowedLength?: number;
}
export function filterWords(wordList: string[], opts: FilterOptions) {
  return wordList.filter((word) => {
    if (opts.allowedLength && word.length !== opts.allowedLength) return false;

    return true;
  });
}
