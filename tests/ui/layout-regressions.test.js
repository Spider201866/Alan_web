/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import path from 'path';
import { readFileSync } from 'fs';
import { setupUI, teardownUI } from './helpers/setup.js';

const projectRoot = process.cwd();
const stylesPath = path.join(projectRoot, 'public', 'styles', 'styles.css');
const homePath = path.join(projectRoot, 'public', 'home.html');
const instructionsPath = path.join(projectRoot, 'public', 'instructions.html');

describe('UI layout regressions', () => {
  let dom;

  beforeEach(() => {
    ({ dom } = setupUI());
  });

  afterEach(() => {
    teardownUI(dom);
  });

  it('keeps home page top-gap guardrails in place', () => {
    const homeHtml = readFileSync(homePath, 'utf8');
    const css = readFileSync(stylesPath, 'utf8');

    expect(homeHtml).toMatch(/<body[^>]*class="[^"]*\bhome-page\b[^"]*"/i);
    expect(css).toContain('html,');
    expect(css).toContain('body {');
    expect(css).toContain('margin: 0;');
    expect(css).toContain('padding: 0;');
    expect(css).toContain('body.home-page {');
    expect(css).toContain('display: block;');
  });

  it('keeps the instruction mode buttons on one row for mobile', () => {
    const instructionsHtml = readFileSync(instructionsPath, 'utf8');
    const css = readFileSync(stylesPath, 'utf8');

    expect(instructionsHtml).toContain('id="optionEye"');
    expect(instructionsHtml).toContain('id="optionEar"');
    expect(instructionsHtml).toContain('id="optionSkin"');

    expect(css).toContain('.switch {');
    expect(css).toContain('display: flex;');
    expect(css).toContain('flex-wrap: nowrap;');
    expect(css).toContain('.switch-label {');
    expect(css).toContain('width: calc((100% - 16px) / 3);');
    expect(css).toContain('white-space: nowrap;');

    expect(css).toContain('@media (max-width: 600px) {');
    expect(css).toContain('.instructions-page .switch-label {');
    expect(css).toContain('width: calc((100% - 12px) / 3);');
    expect(css).toContain('padding: 0 4px;');
  });
});
