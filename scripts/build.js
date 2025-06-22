// Simplified build script for debugging

import { promises as fs } from 'fs';
import path from 'path';

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
    console.log('Starting SIMPLIFIED build process (copy only)...');

    // 1. Clean the dist directory
    console.log('Cleaning dist directory...');
    await fs.rm(distDir, { recursive: true, force: true });
    await fs.mkdir(distDir, { recursive: true });

    // 2. Copy all files from public to dist
    console.log('Copying public files to dist...');
    await copyRecursive(publicDir, distDir);
    console.log('Finished copying files.');

    console.log('\nBuild process complete! dist is now an exact copy of public.');
  } catch (error) {
    console.error('Error during build process:', error);
    process.exit(1);
  }
}

build();
