import { minify } from 'terser';
import cssmin from 'css-minify';
import { promises as fs } from 'fs';
import path from 'path';
import { minify as minifyHtml } from 'html-minifier-terser';

const publicDir = 'public';
const distDir = 'dist';

async function copyRecursive(src, dest) {
  const stats = await fs.stat(src);
  const isDirectory = stats.isDirectory();
  if (isDirectory) {
    await fs.mkdir(dest, { recursive: true });
    for (const child of await fs.readdir(src)) {
      await copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    await fs.copyFile(src, dest);
  }
}

async function build() {
  try {
    console.log('Starting build process...');

    // 1. Clean the dist directory
    console.log('Cleaning dist directory...');
    await fs.rm(distDir, { recursive: true, force: true });
    await fs.mkdir(distDir, { recursive: true });

    // 2. Copy all files from public to dist
    console.log('Copying public files to dist...');
    await copyRecursive(publicDir, distDir);
    console.log('Finished copying files.');

    // 3. Find and minify JS and CSS files in dist
    console.log('Minifying JS, CSS, and HTML files...');
    const filesToProcess = [];
    async function findFiles(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await findFiles(fullPath);
        } else if (
          entry.name.endsWith('.js') ||
          entry.name.endsWith('.css') ||
          entry.name.endsWith('.html')
        ) {
          filesToProcess.push(fullPath);
        }
      }
    }

    await findFiles(distDir);

    for (const file of filesToProcess) {
      if (file.endsWith('.js')) {
        const code = await fs.readFile(file, 'utf8');
        const minified = await minify(code, {
          mangle: {
            toplevel: true,
          },
          compress: {
            drop_console: true,
          },
        });
        await fs.writeFile(file, minified.code);
        console.log(`  - Minified JS: ${file}`);
      } else if (file.endsWith('.css')) {
        const css = await fs.readFile(file, 'utf8');
        const minifiedCss = await cssmin(css);
        await fs.writeFile(file, minifiedCss);
        console.log(`  - Minified CSS: ${file}`);
      } else if (file.endsWith('.html')) {
        const html = await fs.readFile(file, 'utf8');
        const minifiedHtml = await minifyHtml(html, {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyCSS: false,
          minifyJS: false,
        });
        await fs.writeFile(file, minifiedHtml);
        console.log(`  - Minified HTML: ${file}`);
      }
    }

    console.log('\nBuild process complete! Optimized files are in the dist directory.');
  } catch (error) {
    console.error('Error during build process:', error);
    process.exit(1);
  }
}

build();
