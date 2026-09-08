import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const { render } = await import(pathToFileURL(path.join(rootDir, 'dist-ssr/entry-server.js')));

const indexPath = path.join(rootDir, 'dist/index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1) injeta o markup pré-renderizado
const appHtml = render();
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

// 2) inlina o CSS do bundle e tira o <link rel=stylesheet> (elimina request render-blocking)
const cssLink = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+\.css)"[^>]*>/);
if (cssLink) {
  const cssHref = cssLink[1].replace(/^\/muniz-dev-landing-page\//, '');
  const cssFile = path.join(rootDir, 'dist', cssHref);
  if (fs.existsSync(cssFile)) {
    const css = fs.readFileSync(cssFile, 'utf-8');
    html = html.replace(cssLink[0], `<style>${css}</style>`);
    console.log(`Inlined CSS (${(css.length / 1024).toFixed(1)} KB) — removed render-blocking <link>`);
  }
}

fs.writeFileSync(indexPath, html);
console.log('Prerendered content injected into dist/index.html');
