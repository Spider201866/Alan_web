const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(process.cwd(), 'public', 'translations');
const EN_PATH = path.join(TRANSLATIONS_DIR, 'en.json');

const ALLOWED_IDENTICAL_KEYS = new Set([
  'aboutAlanDate',
  'instructionsBackground_eye',
  'instructionsBackground_ear',
  'instructionsBackground_skin',
  'uvLightHeading',
  'atomsButton',
  'videosButton',
  'images',
  'instructionsPageTitle',
]);

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getLocaleFiles() {
  return fs
    .readdirSync(TRANSLATIONS_DIR)
    .filter((fileName) => fileName.endsWith('.json') && fileName !== 'en.json')
    .sort();
}

function findEnglishCarryovers(en, locale) {
  return Object.keys(locale).filter((key) => {
    if (!(key in en)) return false;
    if (ALLOWED_IDENTICAL_KEYS.has(key)) return false;
    return locale[key] === en[key];
  });
}

function main() {
  const en = loadJson(EN_PATH);
  const localeFiles = getLocaleFiles();

  let totalCarryovers = 0;

  console.log('Translation audit against en.json');
  console.log('');

  for (const fileName of localeFiles) {
    const localeCode = path.basename(fileName, '.json');
    const locale = loadJson(path.join(TRANSLATIONS_DIR, fileName));
    const carryovers = findEnglishCarryovers(en, locale);

    totalCarryovers += carryovers.length;

    if (carryovers.length === 0) {
      console.log(`[${localeCode}] no exact English carryovers`);
      continue;
    }

    console.log(`[${localeCode}] ${carryovers.length} exact English carryover(s)`);
    console.log(`  ${carryovers.join(', ')}`);
  }

  console.log('');
  console.log(`Total exact English carryovers: ${totalCarryovers}`);
}

main();
