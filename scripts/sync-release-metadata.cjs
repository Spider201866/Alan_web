#!/usr/bin/env node
/* Alan UI - sync-release-metadata.cjs */
/* Syncs release metadata files:
 * - public/sitemap.xml <lastmod> values
 * - folderList.txt inventory
 */

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const sitemapPath = path.join(root, 'public', 'sitemap.xml');
const folderListPath = path.join(root, 'folderList.txt');
const gitignorePath = path.join(root, '.gitignore');
const todayIso = new Date().toISOString().slice(0, 10);

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeText(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
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

function syncSitemap() {
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`Missing sitemap file: ${sitemapPath}`);
  }

  const before = readText(sitemapPath);
  const after = before.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${todayIso}</lastmod>`);

  if (before !== after) {
    writeText(sitemapPath, after);
  }
}

function syncFolderList() {
  const all = listRepoFiles();
  const content = `${all.join('\n')}\n`;
  writeText(folderListPath, content);
}

function main() {
  syncSitemap();
  syncFolderList();
  console.log(`Synced release metadata for ${todayIso}.`);
}

main();
