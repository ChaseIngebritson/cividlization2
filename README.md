# Cividlization 2

Play here:
https://chaseingebritson.github.io/cividlization2/

Saw a request to get this game re-hosted given the closure of the initial English version of the game.
Please note that this is built off the Kongregate version of the game and still includes all associated API calls that fail when attempting to run.
I own none of this game and do not make any revenue off this product.

## Reverse engineering

The production Angular/Webpack bundle has been partially reverse-engineered on branch `reverse-engineer/beautify-split`.

- [`decompiled/`](./decompiled/README.md) — extracted webpack modules, data tables, `DataService`
- [`angular-app/`](./angular-app/README.md) — reconstructed Angular project (selectors, routes, data, stubbed logic)

```bash
python3 scripts/extract-bundle.py
cd angular-app && npm start
```
