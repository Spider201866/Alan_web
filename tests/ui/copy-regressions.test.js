/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import path from 'path';
import { readdirSync, readFileSync } from 'fs';
import { setupUI, teardownUI } from './helpers/setup.js';

const projectRoot = process.cwd();
const translationsDir = path.join(projectRoot, 'public', 'translations');
const englishPath = path.join(translationsDir, 'en.json');

describe('UI copy regressions', () => {
  let dom;

  beforeEach(() => {
    ({ dom } = setupUI());
  });

  afterEach(() => {
    teardownUI(dom);
  });

  it('keeps uvLightHeading as exactly "Wood\'s lamp" across all locales', () => {
    const files = readdirSync(translationsDir).filter((file) => file.endsWith('.json'));

    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const filePath = path.join(translationsDir, file);
      const content = JSON.parse(readFileSync(filePath, 'utf8'));
      expect(content).toHaveProperty('uvLightHeading');
      expect(content.uvLightHeading).toBe("Wood's lamp");
    }
  });

  it('keeps the corrected English instructions intro spelling', () => {
    const english = JSON.parse(readFileSync(englishPath, 'utf8'));

    expect(english).toHaveProperty('instructionsIntro');
    expect(english.instructionsIntro).toContain('AI learning tool');
    expect(english.instructionsIntro).not.toContain('AI learing tool');
  });
});
