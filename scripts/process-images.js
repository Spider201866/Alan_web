import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import path from 'path';

const inputDir = 'public/images';
const outputDir = 'public/images'; // We'll save them in the same directory for simplicity

const processImages = async () => {
  try {
    // Ensure output directory exists (it should, but good practice)
    await mkdir(outputDir, { recursive: true });

    const files = await readdir(inputDir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      const inputPath = path.join(inputDir, file);

      // Skip if the file is already a webp or not an image we want to process
      if (ext === '.webp' || !['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        continue;
      }

      console.log(`Processing ${file}...`);

      if (baseName === 'atomsblue') {
        // Create responsive versions for the large background image
        const sizes = [1200, 800, 480];
        for (const size of sizes) {
          const outputPath = path.join(outputDir, `${baseName}-${size}w.webp`);
          await sharp(inputPath)
            .resize({ width: size })
            .toFormat('webp', { quality: 80 })
            .toFile(outputPath);
          console.log(`  -> Created ${outputPath}`);
        }
      } else if (ext === '.gif') {
        // Convert animated GIF to animated WebP
        const outputPath = path.join(outputDir, `${baseName}.webp`);
        // Sharp can handle animated gifs when you specify animated: true
        await sharp(inputPath, { animated: true })
            .toFormat('webp', { quality: 80 })
            .toFile(outputPath);
        console.log(`  -> Created ${outputPath}`);
      }
      else {
        // For other images, just convert to a single WebP
        const outputPath = path.join(outputDir, `${baseName}.webp`);
        await sharp(inputPath)
          .toFormat('webp', { quality: 80 })
          .toFile(outputPath);
        console.log(`  -> Created ${outputPath}`);
      }
    }

    console.log('\nImage processing complete!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
};

processImages();
