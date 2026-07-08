import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { categoryFactSchema } from '../../src/data/words/categoryFactSchema.ts';
import { getKanaInfo } from '../../src/lib/wordQuest/normalizeKana.ts';
import type { WordEntry } from '../../src/data/words/wordTypes.ts';

const VALID_REVIEW_STATUSES = new Set(['approved', 'needs_review', 'rejected']);

function getArg(name: string, fallback: string): string {
  const equalsArg = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  if (equalsArg) return equalsArg.slice(name.length + 3);

  const index = process.argv.indexOf(`--${name}`);
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1];

  return fallback;
}

function readWords(filePath: string): WordEntry[] {
  return JSON.parse(readFileSync(filePath, 'utf8')) as WordEntry[];
}

function pushDuplicateWarnings(label: string, values: string[], failures: string[]): void {
  const seen = new Map<string, number>();
  for (const value of values) {
    seen.set(value, (seen.get(value) ?? 0) + 1);
  }
  const duplicates = [...seen.entries()].filter(([, count]) => count > 1);
  for (const [value, count] of duplicates) {
    failures.push(`${label} duplicate: ${value} (${count})`);
  }
}

function allowedFactKeysFor(categories: readonly string[]): Set<string> {
  const allowed = new Set<string>();
  for (const category of categories) {
    const keys = categoryFactSchema[category as keyof typeof categoryFactSchema];
    if (!keys) continue;
    for (const key of keys) allowed.add(key);
  }
  return allowed;
}

function validateWord(word: WordEntry, warnings: string[], failures: string[]): void {
  if (!word.id) failures.push('word id is empty');
  if (!word.word) failures.push(`${word.id}: word is empty`);
  if (!word.reading) failures.push(`${word.id}: reading is empty`);
  if (!word.normalized) failures.push(`${word.id}: normalized is empty`);
  if (!word.mainCategory) failures.push(`${word.id}: mainCategory is empty`);
  if (!Array.isArray(word.categories) || word.categories.length === 0) {
    failures.push(`${word.id}: categories is empty`);
  }
  if (!VALID_REVIEW_STATUSES.has(word.reviewStatus)) {
    failures.push(`${word.id}: invalid reviewStatus ${word.reviewStatus}`);
  }

  const kana = getKanaInfo(word.reading || word.word);
  if (word.kana.first !== kana.first) failures.push(`${word.id}: kana.first should be ${kana.first}`);
  if (word.kana.last !== kana.last) failures.push(`${word.id}: kana.last should be ${kana.last}`);
  if (word.kana.length !== kana.length) failures.push(`${word.id}: kana.length should be ${kana.length}`);

  const categories = [word.mainCategory, ...(word.categories ?? [])];
  const allowedKeys = allowedFactKeysFor(categories);
  for (const fact of word.facts ?? []) {
    if (allowedKeys.size > 0 && !allowedKeys.has(fact.key)) {
      warnings.push(`${word.id}: unknown fact key "${fact.key}" for ${categories.join(', ')}`);
    }
  }
}

function main(): void {
  const wordsPath = resolve(getArg('words', 'src/data/words/words.quest.json'));
  const words = readWords(wordsPath);
  const warnings: string[] = [];
  const failures: string[] = [];

  pushDuplicateWarnings('id', words.map((word) => word.id), failures);
  pushDuplicateWarnings('word', words.map((word) => word.word), failures);
  pushDuplicateWarnings('normalized', words.map((word) => word.normalized), failures);

  for (const word of words) {
    validateWord(word, warnings, failures);
  }

  const approvedCount = words.filter((word) => word.reviewStatus === 'approved').length;
  console.log(`Quest dictionary: ${words.length} words (${approvedCount} approved)`);

  for (const warning of warnings) {
    console.warn(`WARN ${warning}`);
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(`FAIL ${failure}`);
    }
    process.exit(1);
  }

  console.log(`PASS ${words.length} words, ${warnings.length} warning(s), 0 failure(s).`);
}

main();
