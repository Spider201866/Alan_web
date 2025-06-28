// tests/build.test.js
// This file contains tests for the build script, ensuring that files are correctly minified.

import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const distDir = path.join(projectRoot, 'dist');
const buildScriptPath = path.join(projectRoot, 'scripts', 'build.js');

// Helper to execute shell commands
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
};

describe('Build Process Minification', () => {
  beforeAll(async () => {
    // Run the build script before any tests
    console.log('Running build script for tests...');
    await execCommand(`node ${buildScriptPath}`);
  }, 30000); // Increase timeout for build process

  const testFiles = [
    { original: 'index.html', minified: 'index.html' },
    { original: 'styles/styles.css', minified: 'styles/styles.css' },
    { original: 'scripts/home.js', minified: 'scripts/home.js' },
  ];

  test.each(testFiles)(
    'should minify %s and result in a smaller file size',
    async ({ original, minified }) => {
      const originalFilePath = path.join(publicDir, original);
      const minifiedFilePath = path.join(distDir, minified);

      const originalStats = await fs.stat(originalFilePath);
      const minifiedStats = await fs.stat(minifiedFilePath);

      expect(minifiedStats.size).toBeLessThan(originalStats.size);
    },
    10000 // Timeout for individual test
  );

  test('should remove comments from minified HTML files', async () => {
    const htmlContent = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
    expect(htmlContent).not.toContain('<!--');
    expect(htmlContent).not.toContain('-->');
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
