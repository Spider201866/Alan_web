/*
 * Usage:
 *   node scripts/translation-review.cjs es
 *
 * Generates translation-reviews/<lang>.md containing a key-by-key table:
 *   Key | English | Current | Flags
 *
 * Notes:
 * - Does not modify any translation files.
 * - Flags are heuristics to help spot issues quickly.
 */

const fs = require("fs");
const path = require("path");

const lang = process.argv[2];
if (!lang) {
  console.error("Missing language code. Example: node scripts/translation-review.cjs es");
  process.exit(1);
}

const enPath = path.join("public", "translations", "en.json");
const langPath = path.join("public", "translations", `${lang}.json`);

if (!fs.existsSync(langPath)) {
  console.error(`Translation file not found: ${langPath}`);
  process.exit(1);
}

const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const tr = JSON.parse(fs.readFileSync(langPath, "utf8"));

const keys = Object.keys(en);

const outDir = "translation-reviews";
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${lang}.md`);

const escapeCell = (s) => String(s ?? "")
  .replace(/\|/g, "\\|")
  .replace(/\r?\n/g, "<br>");

const flagsFor = (val) => {
  const flags = [];

  if (typeof val !== "string") {
    flags.push("MISSING");
    return flags;
  }

  // Common English clinical tokens accidentally left behind.
  if (/\b(Pupils|Vision)\b/.test(val)) flags.push("EN_TOKENS");

  // Non-target punctuation that often indicates copy/paste.
  if (/。/.test(val)) flags.push("CJK_PUNCT");

  // Suspicious "Label: value" patterns.
  if (/\b\w+\b\s*:\s*\S+/.test(val)) flags.push("COLON_PATTERN");

  return flags;
};

const lines = [];
lines.push(`# Translation review: ${lang}.json vs en.json`);
lines.push("");
lines.push("| Key | English (en) | Current | Flags |");
lines.push("|---|---|---|---|");

for (const k of keys) {
  lines.push(
    `| \`${k}\` | ${escapeCell(en[k])} | ${escapeCell(tr[k])} | ${flagsFor(tr[k]).join(", ")} |`
  );
}

fs.writeFileSync(outPath, lines.join("\n") + "\n", "utf8");

console.log(`Wrote ${outPath} (${keys.length} rows)`);
