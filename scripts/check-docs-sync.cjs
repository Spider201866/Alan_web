#!/usr/bin/env node
/* Alan UI - check-docs-sync.cjs */
/* CI guard for key documentation drift. */

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const gitignorePath = path.join(root, '.gitignore');

const requiredMemoryFiles = [
  'memory-bank/activeContext.md',
  'memory-bank/progress.md',
  'memory-bank/systemPatterns.md',
  'memory-bank/techContext.md',
  'memory-bank/productContext.md',
  'memory-bank/projectbrief.md',
];

const requiredReadmeEntries = ['layout-regressions.test.js', 'copy-regressions.test.js'];
const requiredAgentsEntries = ['README.md', 'tests/README.md', 'folderList.txt'];

const monthNames = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  sept: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

function readFile(filePath) {
  return fs.readFileSync(path.join(root, filePath), 'utf8');
}

function parseReadmeUpdatedDate(readmeContent) {
  const match = readmeContent.match(/^Updated:\s*(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})/m);
  if (!match) return null;
  return {
    day: Number(match[1]),
    month: monthNames[match[2].toLowerCase()],
    year: Number(match[3]),
  };
}

function parseMemoryUpdatedDate(line) {
  const match = line.match(/Updated\s+(\d{1,2})(?:st|nd|rd|th)\s+([A-Za-z]{3,9})\s+(\d{4})/);
  if (!match) return null;
  return {
    day: Number(match[1]),
    month: monthNames[match[2].toLowerCase()],
    year: Number(match[3]),
  };
}

function sameDate(a, b) {
  return a && b && a.day === b.day && a.month === b.month && a.year === b.year;
}

function readGitignoreRules() {
  if (!fs.existsSync(gitignorePath)) return [];
  return fs
    .readFileSync(gitignorePath, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.replace(/\\/g, '/'));
}

function matchesWildcard(pattern, value) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(`^${escaped}$`).test(value);
}

function isIgnored(relPath, rules) {
  const pathPosix = relPath.replace(/\\/g, '/');
  const base = path.posix.basename(pathPosix);

  if (pathPosix.startsWith('.git/')) return true;

  for (const rule of rules) {
    if (rule.endsWith('/')) {
      const dir = rule.slice(0, -1);
      if (pathPosix === dir || pathPosix.startsWith(`${dir}/`)) {
        return true;
      }
      continue;
    }

    if (rule.includes('*')) {
      if (matchesWildcard(rule, base) || matchesWildcard(rule, pathPosix)) {
        return true;
      }
      continue;
    }

    if (pathPosix === rule || base === rule) {
      return true;
    }
  }

  return false;
}

function listRepoFiles() {
  const rules = readGitignoreRules();
  const files = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(currentDir, entry.name);
      const rel = path.relative(root, abs).replace(/\\/g, '/');
      if (isIgnored(rel, rules)) continue;
      if (entry.isDirectory()) {
        walk(abs);
      } else {
        files.push(rel);
      }
    }
  }

  walk(root);
  return files.sort();
}

function diffSets(expected, actual) {
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);
  const missing = actual.filter((x) => !expectedSet.has(x));
  const extra = expected.filter((x) => !actualSet.has(x));
  return { missing, extra };
}

function main() {
  const failures = [];

  const readme = readFile('README.md');
  const testsReadme = readFile('tests/README.md');
  const agents = readFile('AGENTS.md');
  const folderList = readFile('folderList.txt')
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean)
    .sort();

  const readmeDate = parseReadmeUpdatedDate(readme);
  if (!readmeDate) {
    failures.push('README.md is missing a parseable "Updated: D Mon YYYY" line.');
  }

  for (const file of requiredMemoryFiles) {
    const content = readFile(file);
    const firstLine = content.split(/\r?\n/, 1)[0];
    const memDate = parseMemoryUpdatedDate(firstLine);
    if (!memDate) {
      failures.push(`${file} first line is missing a parseable "Updated ..." header.`);
      continue;
    }
    if (readmeDate && !sameDate(memDate, readmeDate)) {
      failures.push(`${file} Updated date does not match README.md Updated date.`);
    }
  }

  for (const entry of requiredReadmeEntries) {
    if (!testsReadme.includes(entry)) {
      failures.push(`tests/README.md is missing reference: ${entry}`);
    }
  }

  for (const entry of requiredAgentsEntries) {
    if (!agents.includes(entry)) {
      failures.push(`AGENTS.md is missing docs-sync reference: ${entry}`);
    }
  }

  const expectedFolderList = listRepoFiles();
  const folderDiff = diffSets(folderList, expectedFolderList);
  if (folderDiff.missing.length || folderDiff.extra.length) {
    failures.push(
      `folderList.txt is out of sync (missing: ${folderDiff.missing.length}, extra: ${folderDiff.extra.length}).`
    );
  }

  if (failures.length) {
    console.error('Documentation sync check failed:\n');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log('Documentation sync check passed.');
}

main();
