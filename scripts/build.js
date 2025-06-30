import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { minify as terserMinify } from 'terser';
import { minify as htmlMinify } from 'html-minifier-terser';

// Promisify the exec function to use it with async/await
const execAsync = promisify(exec);

const SOURCE_DIR = 'public';
const DIST_DIR = 'dist';

/**
 * A utility function to recursively find all files with a specific extension.
 */
async function findFilesByExtension(startPath, extension) {
  const results = [];
  const entries = await fs.readdir(startPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(startPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findFilesByExtension(fullPath, extension)));
    } else if (entry.isFile() && entry.name.endsWith(extension)) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * The main build function.
 */
async function runBuild() {
  try {
    console.log('🚀 Starting production build...');

    // 1. Clean up the old dist directory
    console.log(`🧹 Cleaning old directory: ${DIST_DIR}`);
    await fs.rm(DIST_DIR, { recursive: true, force: true });
    await fs.mkdir(DIST_DIR, { recursive: true });

    // 2. Copy all files from public to dist
    console.log(`📄 Copying all assets from ${SOURCE_DIR}/ to ${DIST_DIR}/`);
    await fs.cp(SOURCE_DIR, DIST_DIR, { recursive: true });

    // 3. Find and patch all HTML files
    console.log('\n🔧 Patching HTML files...');
    const htmlFiles = await findFilesByExtension(DIST_DIR, '.html');
    if (htmlFiles.length === 0) {
      console.warn('⚠️ No HTML files found to patch.');
    }

    for (const file of htmlFiles) {
      console.log(`   - Patching: ${file}`);
      let html = await fs.readFile(file, 'utf8');

      // INJECT A UNIQUE BUILD TIMESTAMP AS PROOF
      const timestamp = `<!--! BUILD TIMESTAMP: ${new Date().toISOString()} -->`;
      html = html.replace('</head>', `  ${timestamp}\n</head>`);

      // THE CRITICAL FIX: Find all relative asset links and make them absolute.
      const assetRegex = /(href|src)="(?!\/|https?:\/\/)(favicons|styles|scripts|images)\//g;
      html = html.replace(assetRegex, '$1="/$2/');

      await fs.writeFile(file, html, 'utf8');

      // --- VERIFICATION STEP ---
      const modifiedHtml = await fs.readFile(file, 'utf8');
      const headContent = modifiedHtml.match(/<head>([\s\S]*?)<\/head>/);
      console.log('✅ VERIFICATION: Patched <head> content is:\n');
      console.log('-----------------------------------------');
      console.log(headContent ? headContent[0] : 'Error: <head> tag not found.');
      console.log('-----------------------------------------\n');
    }

    // 4. Minify assets
    console.log('🗜️ Minifying assets for production...');

    // Minify JS
    const jsFiles = await findFilesByExtension(DIST_DIR, '.js');
    for (const file of jsFiles) {
      const content = await fs.readFile(file, 'utf8');
      const result = await terserMinify(content);
      await fs.writeFile(file, result.code, 'utf8');
      console.log(`   - Minified JS: ${file}`);
    }

    // Minify CSS (using the reliable clean-css-cli)
    const cssFiles = await findFilesByExtension(DIST_DIR, '.css');
    for (const file of cssFiles) {
      // Use the cleancss command-line tool to minify the file in place.
      await execAsync(`npx cleancss -o ${file} ${file}`);
      console.log(`   - Minified CSS: ${file}`);
    }

    // Minify HTML (after patching)
    for (const file of htmlFiles) {
      const content = await fs.readFile(file, 'utf8');
      const minifiedHtml = await htmlMinify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      });
      await fs.writeFile(file, minifiedHtml, 'utf8');
      console.log(`   - Minified HTML: ${file}`);
    }

    console.log('\n✨ Build complete! The `dist` directory is ready for production.');
  } catch (error) {
    console.error('\n❌ Build failed!');
    console.error(error);
    process.exit(1);
  }
}

runBuild();
