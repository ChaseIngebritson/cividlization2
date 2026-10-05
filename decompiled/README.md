# Cividlization 2 — Reverse Engineering

This tree is a reverse-engineered view of the Kongregate production build
(`main-es2015.*.js`). There are **no source maps**, so this is recovered from
minified Webpack/Angular output: beautified modules, extracted data tables, and
a mapped game service — not the original TypeScript project.

## Layout

```
decompiled/
├── README.md                 ← you are here
├── CONTENT.md                ← human-readable content inventory
├── module-catalog.json       ← all 54 webpack modules
├── _raw/                     ← one file per webpack module (as extracted)
├── vendor/
│   ├── angular-rxjs-bundle.js  ← Angular + RxJS from zUnb (pre-game)
│   ├── crypto-js/              ← save encryption helpers
│   ├── pako/                   ← zlib compress/decompress for saves
│   └── misc/                   ← other small vendor modules
└── game/
    ├── app-bundle.js           ← game section of zUnb (data + UI + bootstrap)
    ├── DataService.js          ← core game logic service (~272 methods)
    ├── DataService.methods.json
    ├── routes.js               ← Angular route map
    ├── kongregate-refs.js      ← Kongregate API touchpoints
    ├── content-summary.json
    └── data/                   ← ES modules for game data tables
        ├── index.js
        ├── catalog.json
        ├── civilizations.js
        ├── sciences.js
        ├── buildings.js
        ├── units.js
        ├── policies.js
        ├── …                   ← jobs, eras, deities, powers, etc.
```

## What we found

### Bundle shape

| Piece | Role |
|-------|------|
| **54 webpack modules** | Entry `0` → `zUnb`; most others are crypto-js / pako |
| **`zUnb` (~2.0 MB)** | Entire Angular app + game |
| Split of `zUnb` | Framework (~553 KB) then game (~1.5 MB) at `const ug = {…}` |

### App routes (`game/routes.js`)

`home`, `game/{empire,city,science,world,attacks,simulator,reports,policies,notifications,help,support,options,diplomacy,powers,daily,deity}`

### Core service (`game/DataService.js`)

Minified class `l` — injected as `dataService` everywhere. Handles economy,
science, combat, diplomacy, map, deities/powers, saves-related helpers, and more.
See `DataService.methods.json` for the full method list.

### Game data (`game/data/`)

| Module | Source var | Contents |
|--------|------------|----------|
| `icons` | `ug` | Font Awesome class map |
| `jobs` | `ag` | Specialists (farmers, builders, …) |
| `buildings` | `og` | 81 buildings / wonders |
| `eras` | `cg` | prehistory → future |
| `sciences` | `dg` | 73 techs |
| `policies` | `hg` | Culture groups + policies |
| `units` | `pg` | 27 unit types |
| `features` | `fg` | Feature unlock / nav gates |
| `difficulties` | `gg` | Peaceful → harder AI settings |
| `deities` | `vg` | 6 deities |
| `powers` | `bg` | Deity powers |
| `mysteries` | `_g` | Mystery / relic bonuses |
| `autoassign` | `wg` | City auto-assignment strategies |
| `civilizations` | `xg` | 25 civs |
| `upgrades` | `kg` | Prestige upgrades |
| `terrains` | `Cg` | Map terrains |
| `improvements` | `Ig` | Tile improvements |

See [CONTENT.md](./CONTENT.md) for label lists.

### Saves / Kongregate

- Saves use **pako** (zlib) + **crypto-js** (AES/HMAC family modules under `vendor/`).
- `kongregate_api.js` at repo root is still referenced; in-app calls are noted in `game/kongregate-refs.js`.

## Limits

- Identifiers inside logic are still minified (`l`, `n`, `og`, class `l`, …).
- Angular component classes are minified; templates are AOT-compiled into the bundle.
- This is **not** a runnable Angular source tree — data modules are readable ES exports for study/patching.
- Original authors retain rights; this is archival / re-host support only.

## Regenerating

From repo root (requires the production `main-es2015.*.js`):

```bash
python3 scripts/extract-bundle.py
npx prettier --write "decompiled/game/data/*.js" "decompiled/game/DataService.js"
```
