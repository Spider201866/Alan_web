const fs = require('fs');
const path = require('path');

const translationsDir = path.join(__dirname, '../public/translations');
const englishFilePath = path.join(translationsDir, 'en.json');

// Function to flatten a JSON object into dot-notation keys
function flattenObject(obj, parentKey = '') {
    let flattened = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Object.assign(flattened, flattenObject(obj[key], newKey));
            } else {
                flattened[newKey] = obj[key];
            }
        }
    }
    return flattened;
}

// Function to check for placeholder values
function hasPlaceholder(value) {
    // Generic regex for patterns like "(LANG: ...)", "(ARABIC: ...)", etc.
    // It looks for text enclosed in parentheses, starting with word characters and a colon.
    return typeof value === 'string' && /\(\w+:\s*.*\)/.test(value);
}

async function checkTranslations() {
    console.log('Starting translation consistency check...\n');

    let englishTranslations = {};
    try {
        const englishContent = await fs.promises.readFile(englishFilePath, 'utf8');
        englishTranslations = flattenObject(JSON.parse(englishContent));
        console.log(`Loaded ${Object.keys(englishTranslations).length} keys from en.json`);
    } catch (error) {
        console.error(`Error loading en.json: ${error.message}`);
        return;
    }

    const files = await fs.promises.readdir(translationsDir);
    const languageFiles = files.filter(file => file.endsWith('.json') && file !== 'en.json');

    if (languageFiles.length === 0) {
        console.log('No other language files found to compare against.');
        return;
    }

    for (const file of languageFiles) {
        const filePath = path.join(translationsDir, file);
        console.log(`\n--- Checking ${file} ---`);
        let currentTranslations = {};
        try {
            const content = await fs.promises.readFile(filePath, 'utf8');
            currentTranslations = flattenObject(JSON.parse(content));
        } catch (error) {
            console.error(`Error loading ${file}: ${error.message}`);
            continue;
        }

        const missingKeys = [];
        for (const key in englishTranslations) {
            if (englishTranslations.hasOwnProperty(key) && !currentTranslations.hasOwnProperty(key)) {
                missingKeys.push(key);
            }
        }

        const extraKeys = [];
        for (const key in currentTranslations) {
            if (currentTranslations.hasOwnProperty(key) && !englishTranslations.hasOwnProperty(key)) {
                extraKeys.push(key);
            }
        }

        const placeholderKeys = [];
        for (const key in currentTranslations) {
            if (currentTranslations.hasOwnProperty(key) && hasPlaceholder(currentTranslations[key])) {
                placeholderKeys.push(key);
            }
        }

        if (missingKeys.length > 0) {
            console.log('Missing Keys (present in en.json but not in this file):');
            missingKeys.forEach(key => console.log(`  - ${key}`));
        } else {
            console.log('No missing keys.');
        }

        if (extraKeys.length > 0) {
            console.log('Extra Keys (present in this file but not in en.json):');
            extraKeys.forEach(key => console.log(`  - ${key}`));
        } else {
            console.log('No extra keys.');
        }

        if (placeholderKeys.length > 0) {
            console.log('Placeholder Values Found:');
            placeholderKeys.forEach(key => console.log(`  - ${key}: "${currentTranslations[key]}"`));
        } else {
            console.log('No placeholder values found.');
        }
    }

    console.log('\nTranslation consistency check complete.');
}

checkTranslations();
