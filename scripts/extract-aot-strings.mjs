#!/usr/bin/env node
/**
 * Best-effort scrape of static text nodes from View Engine AOT factories
 * in main.pretty.js (helps rebuild templates manually).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const text = readFileSync(join(root, 'decompiled/main.pretty.js'), 'utf8');

const selectors = [
  ...text.matchAll(/jt\("(app-[^"]+)"/g),
].map((m) => m[1]);

const unique = [...new Set(selectors)];
const out = { generatedAt: new Date().toISOString(), selectors: {} };

for (const sel of unique) {
  const idx = text.indexOf(`jt("${sel}"`);
  const window = text.slice(Math.max(0, idx - 8000), idx + 2000);
  const strings = [
    ...window.matchAll(/_u\(-1,\s*null,\s*\["([^"]{2,80})"\]\)/g),
  ].map((m) => m[1]);
  out.selectors[sel] = [...new Set(strings)].slice(0, 80);
}

const dir = join(root, 'decompiled/extracted');
mkdirSync(dir, { recursive: true });
const path = join(dir, 'aot-template-strings.json');
writeFileSync(path, JSON.stringify(out, null, 2));
console.log('Wrote', path);
