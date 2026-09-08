import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'src/assets/gabriela-laptop-source.png');
const assetsDir = path.join(root, 'src/assets');
const publicDir = path.join(root, 'public');

async function run() {
  await sharp(source).resize(200, 200).webp({ quality: 80 }).toFile(path.join(assetsDir, 'gabriela-laptop.webp'));
  await sharp(source).resize(400, 400).webp({ quality: 80 }).toFile(path.join(assetsDir, 'gabriela-laptop@2x.webp'));
  await sharp(source).resize(200, 200).png({ quality: 80, compressionLevel: 9 }).toFile(path.join(assetsDir, 'gabriela-laptop.png'));
  await sharp(source).resize(400, 400).png({ quality: 80, compressionLevel: 9 }).toFile(path.join(assetsDir, 'gabriela-laptop@2x.png'));
  await sharp(source).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(publicDir, 'og-image.jpg'));

  console.log('Hero image assets generated.');
}

run();
