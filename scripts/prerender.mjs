import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const { render } = await import(pathToFileURL(path.join(rootDir, 'dist-ssr/entry-server.js')));

const indexPath = path.join(rootDir, 'dist/index.html');
const html = fs.readFileSync(indexPath, 'utf-8');
const appHtml = render();
const finalHtml = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

fs.writeFileSync(indexPath, finalHtml);
console.log('Prerendered content injected into dist/index.html');
