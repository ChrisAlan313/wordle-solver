//#!/usr/bin/env tsx

import { readFile, writeFile } from 'node:fs/promises';
import { filterWords } from './filter';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = await yargs(hideBin(process.argv))
  .option('fromFile', {
    alias: 'i',
    type: 'string',
    describe: 'Path to input word list file',
  })
  .option('len', {
    alias: 'l',
    type: 'number',
    describe: 'Exact allowed word length',
  })
  .option('minCharCnts', {
    alias: 'c',
    type: 'array',
    describe: 'Minimum letters to include in the form letter:count (e.g. e:2)',
  })
  .option('posChars', {
    alias: 'p',
    type: 'array',
    describe: 'Positional letters in the form letter:index (0-based)',
  })
  .help()
  .parse();

function parsePair(pair: unknown): [string, number] {
  if (typeof pair !== 'string') throw new Error('Input must be string');
  const [rawChar, numStr] = pair.split(':');
  const char = rawChar.toLowerCase();
  if (!/^[a-z]$/.test(char)) throw new Error(`Invalid char: ${char}`);
  if (!/^\d{1,2}$/.test(numStr)) throw new Error(`Invalid number: ${numStr}`);
  return [char, Number(numStr)];
}

function parsePairs(input: (string | number)[] | undefined): [string, number][] {
  if (!input) return [];
  return input.map(parsePair);
}

async function run() {
  let raw: string;
  try {
    raw = await readFile(argv.fromFile ?? './src/5-letter-words.txt', 'utf-8');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const wordList = raw
    .split('\n')
    .map((w) => w.trim())
    .filter(Boolean);

  const filtered = filterWords(wordList, {
    allowedLength: argv.len,
    minimumLetters: parsePairs(argv.minCharCnts),
    positionalLetters: parsePairs(argv.posChars),
  });

  console.log(filtered);
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
