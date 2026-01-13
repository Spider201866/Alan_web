/*
 * Sync small UI label translations across all languages.
 *
 * This script is intentionally narrow and safe:
 * - Adds/updates the `installButton` key (PWA install button label on home page)
 * - Optionally improves `userLatLong` where it was still the English "Lat & Long"
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join('public', 'translations');

const updatesByLang = {
  am: {
    installButton: 'መጫን',
  },
  ar: {
    installButton: 'تثبيت',
  },
  bn: {
    installButton: 'ইনস্টল করুন',
  },
  cy: {
    installButton: 'Gosod',
  },
  es: {
    installButton: 'Instalar',
  },
  fa: {
    installButton: 'نصب',
  },
  fr: {
    installButton: 'Installer',
    // Slightly more explicit French label.
    userLatLong: 'Latitude et longitude',
  },
  ha: {
    installButton: 'Shigar',
  },
  hi: {
    installButton: 'इंस्टॉल करें',
  },
  id: {
    installButton: 'Instal',
  },
  ig: {
    installButton: 'Wụnye',
    userLatLong: 'Latitude na Longitude',
  },
  ln: {
    installButton: 'Installer',
  },
  ny: {
    installButton: 'Ikani',
    userLatLong: 'Latitude ndi Longitude',
  },
  pt: {
    installButton: 'Instalar',
    userLatLong: 'Latitude e Longitude',
  },
  rw: {
    installButton: 'Shyiramo',
    userLatLong: 'Latitudi na Longitudi',
  },
  sn: {
    installButton: 'Isa',
    userLatLong: 'Latitude ne Longitude',
  },
  sw: {
    installButton: 'Sakinisha',
    userLatLong: 'Latitudo na Longitudo',
  },
  ur: {
    installButton: 'انسٹال کریں',
  },
  yo: {
    installButton: 'Fi sori ẹrọ',
  },
  zh: {
    installButton: '安装',
  },
  zu: {
    installButton: 'Faka',
  },
};

function main() {
  const files = fs.readdirSync(TRANSLATIONS_DIR).filter((f) => f.endsWith('.json'));
  const updated = [];
  const skipped = [];

  for (const file of files) {
    const lang = file.replace('.json', '');
    const filePath = path.join(TRANSLATIONS_DIR, file);
    const obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (lang === 'en') {
      // Add the English key as the source of truth.
      obj.installButton = obj.installButton || 'Install';
      fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + '\n', 'utf8');
      updated.push(lang);
      continue;
    }

    const patch = updatesByLang[lang];
    if (!patch) {
      // Still add the key with an English fallback so the UI translator can function.
      // (If you want stricter behavior, we can instead require a mapping for all langs.)
      obj.installButton = obj.installButton || 'Install';
      fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + '\n', 'utf8');
      skipped.push(lang);
      continue;
    }

    obj.installButton = patch.installButton;
    if (patch.userLatLong) {
      obj.userLatLong = patch.userLatLong;
    }

    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + '\n', 'utf8');
    updated.push(lang);
  }

  // eslint-disable-next-line no-console
  console.log(`Updated: ${updated.sort().join(', ')}`);
  if (skipped.length) {
    // eslint-disable-next-line no-console
    console.log(`No mapping (fallback added): ${skipped.sort().join(', ')}`);
  }
}

main();

