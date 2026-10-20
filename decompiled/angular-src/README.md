# Cividlization 2 — reconstructed Angular source

This tree is a **best-effort reconstruction** from the shipped Kongregate/GitHub Pages build (Angular **View Engine** AOT webpack bundle). It is **not** the original TypeScript project.

## What this app is

Real-time civilization idle/strategy game (v1.3.7 / internal `conf.version = 43`):

- Found a capital city, assign citizens, queue buildings/troops/science
- Explore a procedural world map, fight barbarians/AI civs, diplomacy & trade
- Prestige/rebirth, deities, spells, policies, wonders
- Saves encrypted (AES + optional gzip) to `localStorage` under `cv2sv_*`
- Kongregate API for username, MTX gifts, and stats (fails off-Kongregate)

## Evidence / recovery notes

| Artifact | Role |
|---|---|
| `../main.pretty.js` | Prettier-formatted full main bundle (~114k lines) |
| `../extracted/*.raw.js` | Sliced minified classes with original short names (`Tg`, `zg`, …) |
| REA `analyze_javascript_application` | Parent evidence `ev_1243bf6f5bbf4e633cd9cd1d6565bdd2cd703c19496d5e63d9f913b7eb725d35` |

**Limitations (unknowns preserved):**

- No source maps shipped → original file paths / class names are inferred
- View Engine AOT compiled templates to factory functions (`su`/`gi`/`ku`); HTML templates are not recoverable as original `.html`
- `recover_javascript_sources` (Wakaru) requires Linux x64 — not available on this Darwin host
- Runtime equivalence of renamed TypeScript is **not** verified

## Original minified → reconstructed names

| Minified | Reconstructed |
|---|---|
| `Tg` | `ConfigService` / game config |
| `Pg` | `GameData` |
| `Eg` | `Player` |
| `Ag` | `City` |
| `Og` | `SaveRecord` |
| `Rg` | `ToastService` |
| `Bg` | `KongService` |
| `zg` | `DataService` |
| `$g` | `SaveService` |
| `vv` | `CoreEngineService` |
| `Fv` | `TopbarComponent` (inferred) |

## Routing (observed from bundle)

```
/home
/game                 → shell (left menu, topbar, spells)
  /game/empire|city   → city container
  /game/science
  /game/world
  /game/attacks
  /game/diplomacy
  /game/policies
  /game/powers
  /game/simulator
  /game/reports
/notifications /help /support /options /daily /deity
```

## How to run

From the **repo root** (after `npm run install:all`):

```bash
npm start                 # original static build → http://localhost:8080/cividlization2/
npm run start:decompiled  # this Angular app → http://localhost:4200/
npm run start:all         # both in parallel
```

Or from this folder: `npm start`.

## How to use this folder

1. Read `src/app/services/*` and `src/app/models/*` for game logic recovered from the bundle.
2. Use `../extracted/data.service.raw.js` (~3.8k lines) and `../extracted/core-engine.raw.js` for the full minified bodies not yet fully TypeScript-translated.
3. Treat `src/app/components/*` stubs as structural placeholders; wire templates by studying AOT factories in `main.pretty.js` near each `jt("app-…")` marker.
