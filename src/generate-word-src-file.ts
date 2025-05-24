// npx tsx src/generate-word-src-file.ts

import { readFile, writeFile } from 'node:fs/promises';
import { filterWords } from "./filter";

async function readWordListFromFile(path: string): Promise<string[]> {
  const content = await readFile(path, 'utf-8');
  return content.split('\n').map(w => w.trim()).filter(Boolean);
}

async function writeWordListToFile(words: string[], path: string): Promise<void> {
  const sorted = words.sort();
  const json = JSON.stringify(sorted, null, 2);
  await writeFile(path, json, 'utf-8');
}

async function makeFilteredFile(inputPath: string, outputPath: string): Promise<void> {
  const words = await readWordListFromFile(inputPath);
  const filteredWords = filterWords(words, { allowedLength: 5 });
  await writeWordListToFile(filteredWords, outputPath);
}

makeFilteredFile('./src/raw-words.txt', './src/5-letter-words.json');
