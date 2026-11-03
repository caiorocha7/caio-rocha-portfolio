// Servidor estático mínimo que imita o GitHub Pages: serve out/ sob o basePath,
// resolve diretórios para index.html e responde 404.html para rotas inexistentes.
// Uso: pnpm start   (PORT e NEXT_PUBLIC_BASE_PATH opcionais)
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../out');
const PORT = Number(process.env.PORT ?? 4321);
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? '/caio-rocha-portfolio').replace(/\/$/, '');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
};

function send(res, status, file) {
  res.writeHead(status, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
}

createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
  if (BASE && url === BASE) {
    res.writeHead(301, { Location: `${BASE}/` });
    return res.end();
  }
  if (BASE && !url.startsWith(`${BASE}/`)) return send(res, 404, join(ROOT, '404.html'));

  const relative = normalize(url.slice(BASE.length)).replace(/^([/\\])+/, '');
  let file = join(ROOT, relative);
  if (!file.startsWith(ROOT)) return send(res, 404, join(ROOT, '404.html'));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) return send(res, 404, join(ROOT, '404.html'));
  send(res, 200, file);
}).listen(PORT, () => console.log(`Servindo out/ em http://localhost:${PORT}${BASE}/`));
