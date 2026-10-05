# Cividlization II — Reconstructed Angular source

This is a **reconstructed** Angular application shaped like the original Kongregate
build, based on reverse engineering of the production webpack bundle (no source maps).

It is **not** the original TypeScript/HTML source. Templates were AOT-compiled and
are stubbed; `DataService` method bodies are stubs ready to be ported from
`../decompiled/game/DataService.js`.

## Original vs this tree

| Original (inferred) | This project |
|---------------------|--------------|
| Angular ~8 View Engine + NgModules | Angular 19 standalone components |
| AOT templates in bundle | Recovered via View Engine decompile → polished HTML (see `../decompiled/game/templates/`) |
| Minified `dataService` class | `DataService` with recovered API surface |
| Data tables `ug`/`dg`/`og`/… | `src/app/data/*.ts` |

## Layout

```
src/app/
  home/                 app-home
  game/                 app-game shell
    leftmenu/           app-leftmenu
    topbar/             app-topbar
    city/               app-citycontainer + buildings/troops/topmenu
    science/ world/ attacks/ simulator/ reports/
    policies/ diplomacy/ powers/ deity/ daily/
    notifications/ options/ help/ support/ spells/
  shared/toasts/        app-toasts
  core/services/        data, save, kong, toast
  core/guards/          gameActiveGuard (/game)
  data/                 recovered design tables
```

## Run

```bash
npm install
npm start
```

Open http://localhost:4200 — Home → New Game enters the `/game` shell.

## Porting next

1. Move logic from `../decompiled/game/DataService.js` into `data.service.ts` method-by-method.
2. Rebuild templates by observing the live production game / `app-bundle.js` AOT instructions.
3. Reintroduce save encryption (pako + crypto-js) to match Kongregate saves if needed.
