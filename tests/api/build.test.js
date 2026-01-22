// tests/build.test.js
// This file contains tests for the build script, ensuring that files are correctly minified.

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runBuild } from '../../scripts/build.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../..'); // Adjusted path
const distDir = path.join(projectRoot, 'dist');

describe('Build Process Minification', () => {
  beforeAll(async () => {
    // Run the build script before any tests
    console.log('Running build script for tests...');
    await runBuild();
  }, 30000); // Increase timeout for build process

  const expectedOutputs = [
    'index.html',
    'styles/styles.css',
    'scripts/home.js',
    'service-worker.js',
  ];

  test.each(expectedOutputs)('should produce %s in dist/', async (relPath) => {
    const outPath = path.join(distDir, relPath);
    const stat = await fs.stat(outPath);
    expect(stat.size).toBeGreaterThan(0);
  });

  test('should remove comments from minified CSS files', async () => {
    const cssContent = await fs.readFile(path.join(distDir, 'styles', 'styles.css'), 'utf8');
    expect(cssContent).not.toContain('/*');
    expect(cssContent).not.toContain('*/');
  });

  test('should remove comments from minified JS files', async () => {
    const jsContent = await fs.readFile(path.join(distDir, 'scripts', 'home.js'), 'utf8');
    expect(jsContent).not.toContain('//');
    expect(jsContent).not.toContain('/*');
    expect(jsContent).not.toContain('*/');
  });
});
