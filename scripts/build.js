import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import CleanCSS from 'clean-css';
import { minify as terserMinify } from 'terser';
import { minify as htmlMinify } from 'html-minifier-terser';

const SOURCE_DIR = 'public';
const DIST_DIR = 'dist';
const __filename = fileURLToPath(import.meta.url);

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
export async function runBuild() {
  try {
    console.log('🚀 Starting production build...');

    const buildDebug = process.env.BUILD_DEBUG === 'true';

    // Use a single build timestamp/id across the entire build.
    // This allows us to stamp the service worker cache name so it changes per build,
    // forcing clients to refresh cached assets without manual CACHE_NAME bumps.
    const buildTimestamp = new Date().toISOString();
    const buildId = buildTimestamp.replace(/[^0-9]/g, '');

    // 1. Clean up the old dist directory
    console.log(`🧹 Cleaning old directory: ${DIST_DIR}`);
    await fs.rm(DIST_DIR, { recursive: true, force: true });
    await fs.mkdir(DIST_DIR, { recursive: true });

    // 2. Copy all files from public to dist
    console.log(`📄 Copying all assets from ${SOURCE_DIR}/ to ${DIST_DIR}/`);
    await fs.cp(SOURCE_DIR, DIST_DIR, { recursive: true });

    // 2b. Stamp service worker cache name (dist only)
    // This keeps the source SW maintainable while ensuring production updates
    // always trigger a fresh cache.
    const swPath = path.join(DIST_DIR, 'service-worker.js');
    try {
      const sw = await fs.readFile(swPath, 'utf8');
      const newCacheName = `alanui-${buildId}`;
      const updated = sw.replace(
        /const\s+CACHE_NAME\s*=\s*['"][^'"]+['"];?/,
        `const CACHE_NAME = '${newCacheName}';`
      );

      if (updated === sw) {
        console.warn(
          `⚠️ Could not stamp CACHE_NAME in service-worker.js (pattern not found). Leaving as-is: ${swPath}`
        );
      } else {
        await fs.writeFile(swPath, updated, 'utf8');
        console.log(`✅ Stamped service worker CACHE_NAME: ${newCacheName}`);
      }
    } catch {
      console.warn(`⚠️ No service-worker.js found at ${swPath}; skipping SW cache stamping.`);
    }

    // 3. Find and patch all HTML files
    console.log('\n🔧 Patching HTML files...');
    const htmlFiles = await findFilesByExtension(DIST_DIR, '.html');
    if (htmlFiles.length === 0) {
      console.warn('⚠️ No HTML files found to patch.');
    }

    const stripBomChars = (input) => input.replace(/\uFEFF/g, '');

    for (const file of htmlFiles) {
      console.log(`   - Patching: ${file}`);
      let html = stripBomChars(await fs.readFile(file, 'utf8'));

      // Inject build markers.
      // - `alanui-env`: allows client code (e.g. log.js) to behave differently in production
      //   without relying on a specific hostname.
      // - build timestamp: human-readable release tracing (may be removed by HTML minification).
      const hasHeadTag = /<\/head>/i.test(html);
      if (hasHeadTag) {
        const envMeta = '<meta name="alanui-env" content="production">';
        const timestamp = `<!--! BUILD TIMESTAMP: ${buildTimestamp} -->`;
        html = html.replace('</head>', `  ${envMeta}\n  ${timestamp}\n</head>`);
      }

      // Normalize relative asset URLs to root-absolute and avoid double slashes.
      // Example:
      //   src="scripts/log.js"      -> src="/scripts/log.js"
      //   src="scripts//log.js"     -> src="/scripts/log.js"
      //   src="./scripts/log.js"    -> src="/scripts/log.js"
      //   href="styles//styles.css" -> href="/styles/styles.css"
      //
      // NOTE: This matches only non-absolute (not starting with / or http(s)://) paths.
      // It also consumes 1+ slashes after the folder to collapse them to a single '/'.
      const assetRegex =
        /(href|src)="(?!\/|https?:\/\/)(?:\.\/)?(favicons|styles|scripts|images)\/+?/g;
      html = html.replace(assetRegex, '$1="/$2/');

      await fs.writeFile(file, stripBomChars(html), 'utf8');

      // --- VERIFICATION STEP (avoid CI log spam) ---
      // The previous build output printed the full <head> for every HTML file which made CI logs noisy.
      // If you need deep debugging, run with BUILD_DEBUG=true.
      if (buildDebug) {
        const headContent = html.match(/<head>([\s\S]*?)<\/head>/);
        console.log('✅ BUILD_DEBUG: Patched <head> content is:\n');
        console.log('-----------------------------------------');
        console.log(headContent ? headContent[0] : 'Error: <head> tag not found.');
        console.log('-----------------------------------------\n');
      } else {
        const hasEnvMarker = html.includes('name="alanui-env"');
        if (hasHeadTag && !hasEnvMarker) {
          console.warn(`⚠️ Expected alanui-env marker missing in: ${file}`);
        }
      }
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

    // Minify CSS (using clean-css to avoid shelling out).
    const cssFiles = await findFilesByExtension(DIST_DIR, '.css');
    for (const file of cssFiles) {
      const content = await fs.readFile(file, 'utf8');
      const result = new CleanCSS().minify(content);
      if (result.errors && result.errors.length > 0) {
        throw new Error(`CleanCSS failed for ${file}: ${result.errors.join('; ')}`);
      }
      await fs.writeFile(file, result.styles, 'utf8');
      console.log(`   - Minified CSS: ${file}`);
    }

    // Minify HTML (after patching)
    for (const file of htmlFiles) {
      const content = stripBomChars(await fs.readFile(file, 'utf8'));
      const minifiedHtml = await htmlMinify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      });
      await fs.writeFile(file, stripBomChars(minifiedHtml), 'utf8');
      console.log(`   - Minified HTML: ${file}`);
    }

    console.log('\n✨ Build complete! The `dist` directory is ready for production.');
  } catch (error) {
    console.error('\n❌ Build failed!');
    console.error(error);
    throw error;
  }
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (isDirectRun) {
  runBuild().catch(() => {
    process.exit(1);
  });
}
