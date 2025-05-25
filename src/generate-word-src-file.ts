// npx tsx src/generate-word-src-file.ts

import SpellChecker from 'simple-spellchecker';
import { readFile, writeFile } from 'node:fs/promises';
import { filterWords, type FilterOptions } from './filter';

function loadDictionaries() {
  return {
    americanDictionary: SpellChecker.getDictionarySync('en-US'),
    britishDictionary: SpellChecker.getDictionarySync('en-GB'),
  };
}

async function readWordListFromFile(path: string): Promise<string[]> {
  const content = await readFile(path, 'utf-8');
  return content
    .split('\n')
    .map((w) => w.trim())
    .filter(Boolean);
}

function isMisspelled(word: string, dictionaries: any[]) {
  return dictionaries.some((dict) => dict.spellCheck(word));
}

async function writeWordListToFile(words: string[], path: string): Promise<void> {
  const sorted = words.sort();
  const content = sorted.join('\n');
  await writeFile(path, content, 'utf-8');
}

async function makeFilteredFile(
  inputPath: string,
  outputPath: string,
  filterOptions?: FilterOptions
): Promise<void> {
  const { americanDictionary, britishDictionary } = loadDictionaries();
  const words = await readWordListFromFile(inputPath);
  const filteredWords = filterWords(words, filterOptions ?? {});
  const properWords = filteredWords.filter((word) =>
    isMisspelled(word, [americanDictionary, britishDictionary])
  );
  await writeWordListToFile(properWords, outputPath);
}

// makeFilteredFile('./src/cleaned-words.txt', './src/5-letter-words.txt', { allowedLength: 5 });

