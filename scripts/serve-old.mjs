#!/usr/bin/env node
/**
 * Serves the original static Angular build under /cividlization2/
 * to match <base href="/cividlization2/"> in index.html.
 */
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sirv from 'sirv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const port = Number(process.env.PORT_OLD || process.env.PORT || 8080);
const BASE = '/cividlization2';

const assets = sirv(root, {
  etag: true,
  dev: true,
  single: true,
});

createServer((req, res) => {
  const url = req.url || '/';

  if (url === '/' || url === '') {
    res.writeHead(302, { Location: `${BASE}/` });
    res.end();
    return;
  }

  if (!url.startsWith(BASE)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Not found. Open ${BASE}/`);
    return;
  }

  req.url = url.slice(BASE.length) || '/';
  assets(req, res);
}).listen(port, () => {
  console.log(`Original build → http://localhost:${port}${BASE}/`);
});
