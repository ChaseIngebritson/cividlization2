# Decompiled Cividlization 2

## Run

```bash
npm run install:all
npm start                 # original → http://localhost:8080/cividlization2/
npm run start:decompiled  # rebuilt → http://localhost:4200/
npm run start:all         # both
npm run build:decompiled  # regenerate kernel + ng build
```

## What’s in place

| Area | Status |
|---|---|
| Game tables + `ConfigService` | Ported via `game-kernel.js` |
| `DataService` (~3.8k lines) | Ported in kernel |
| `CoreEngine` + `AiEngine` | Ported in kernel |
| Saves (AES + gzip) | Wired with `crypto-js` + `pako` |
| Pipes / nested city components / screens | Scaffolded |
| Templates | **Approximate** HTML (not original AOT) |
| Assets / legacy CSS / FA icons | Copied / linked |

Kernel generator: `npm run build:kernel` → `angular-src/src/app/legacy/game-kernel.js`  
AOT string scrape (for further UI work): `node scripts/extract-aot-strings.mjs` → `extracted/aot-template-strings.json`

## Still imperfect vs original

- Full View Engine HTML factories were not restored 1:1 (world map canvas, rich diplomacy tabs, etc.)
- Modal / clipboard / keymap / popup helpers are only partially covered by the kernel slice
- Font Awesome brand/regular webfonts were not in the repo (solid icons only)
- Runtime parity with the Kongregate build is **not** fully verified — compare with `npm start`
