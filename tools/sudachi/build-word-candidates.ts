import { createReadStream, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { getKanaInfo, normalizeKana } from '../../src/lib/wordQuest/normalizeKana.ts';
import type { WordCandidate } from '../../src/data/words/wordTypes.ts';

type DictionaryName = 'core' | 'small';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

function getArg(name: string, fallback: string): string {
  const equalsArg = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  if (equalsArg) return equalsArg.slice(name.length + 3);

  const index = process.argv.indexOf(`--${name}`);
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1];

  return fallback;
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      cells.push(cell);
      cell = '';
    } else {
      cell += char;
    }
  }

  cells.push(cell);
  return cells;
}

function findLexCsvFiles(rawDir: string, dictionary: DictionaryName): string[] {
  const found: string[] = [];

  function walk(dir: string): void {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name === `${dictionary}_lex.csv`) {
        found.push(fullPath);
      }
    }
  }

  if (existsSync(rawDir)) walk(rawDir);
  return found;
}

function isCandidateReading(reading: string): boolean {
  return /^[ぁ-んー]+$/.test(reading) && reading.length >= 2 && reading.length <= 8;
}

function collectAutoFlags(word: string, reading: string): string[] {
  const flags: string[] = [];
  if (reading.endsWith('ん')) flags.push('ends_with_ん');
  if (reading.includes('ー')) flags.push('contains_long_mark');
  if (word !== reading) flags.push('surface_differs_from_reading');
  return flags;
}

function candidateId(dictionary: DictionaryName, normalized: string, index: number): string {
  const hex = Buffer.from(normalized).toString('hex').slice(0, 16);
  return `sudachi-${dictionary}-${String(index).padStart(5, '0')}-${hex}`;
}

async function readCandidatesFromCsv(
  filePath: string,
  dictionary: DictionaryName,
  seen: Set<string>,
  candidates: WordCandidate[],
  limit: number,
): Promise<void> {
  const stream = createReadStream(filePath, { encoding: 'utf8' });
  const lines = createInterface({ input: stream, crlfDelay: Infinity });

  for await (const line of lines) {
    if (limit > 0 && candidates.length >= limit) break;
    if (line.trim() === '') continue;

    const cells = parseCsvLine(line);
    const surface = cells[0]?.trim() ?? '';
    const pos = cells.slice(5, 11);
    const readingCell = cells[11]?.trim() ?? '';
    const normalizedCell = cells[12]?.trim() ?? surface;

    if (surface === '' || readingCell === '') continue;
    if (pos[0] !== '名詞') continue;
    if (pos.includes('固有名詞')) continue;

    const reading = normalizeKana(readingCell);
    const normalized = normalizeKana(normalizedCell || reading);
    if (!isCandidateReading(reading)) continue;
    if (!/^[ぁ-んー]+$/.test(normalized)) continue;
    if (seen.has(normalized)) continue;

    const kana = getKanaInfo(reading);
    seen.add(normalized);
    candidates.push({
      id: candidateId(dictionary, normalized, candidates.length + 1),
      word: reading,
      reading,
      normalized,
      kana: {
        first: kana.first,
        last: kana.last,
        length: kana.length,
      },
      source: {
        type: 'sudachi',
        dictionary,
      },
      autoFlags: collectAutoFlags(surface, reading),
      reviewStatus: 'needs_review',
    });
  }
}

async function main(): Promise<void> {
  const rawDir = resolve(getArg('rawDir', join(repoRoot, 'tools/sudachi/raw')));
  const dictionary = getArg('dictionary', 'core') as DictionaryName;
  const outPath = resolve(getArg('out', join(repoRoot, 'src/data/words/wordCandidates.json')));
  const limit = Number(getArg('limit', '5000'));

  if (dictionary !== 'core' && dictionary !== 'small') {
    throw new Error(`Unsupported dictionary: ${dictionary}`);
  }

  const csvFiles = findLexCsvFiles(rawDir, dictionary);
  if (csvFiles.length === 0) {
    throw new Error(`No ${dictionary}_lex.csv found under ${rawDir}`);
  }

  const seen = new Set<string>();
  const candidates: WordCandidate[] = [];
  for (const csvFile of csvFiles) {
    await readCandidatesFromCsv(csvFile, dictionary, seen, candidates, limit);
    if (limit > 0 && candidates.length >= limit) break;
  }

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(candidates, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${candidates.length} candidates to ${outPath}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
