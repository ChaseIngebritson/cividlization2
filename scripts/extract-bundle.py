#!/usr/bin/env python3
"""Extract and organize modules from the Cividlization 2 webpack main bundle.

Usage (from repo root):
  python3 scripts/extract-bundle.py

Expects main-es2015.*.js in the repo root. Writes under decompiled/.
"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "decompiled"


def find_main_bundle() -> Path:
    matches = sorted(ROOT.glob("main-es2015.*.js"))
    if not matches:
        raise SystemExit("No main-es2015.*.js found in repo root")
    return matches[0]


def skip_string(s: str, i: int) -> int:
    q = s[i]
    i += 1
    while i < len(s):
        if s[i] == "\\":
            i += 2
            continue
        if s[i] == q:
            return i + 1
        i += 1
    return i


def skip_template(s: str, i: int) -> int:
    i += 1
    while i < len(s):
        if s[i] == "\\":
            i += 2
            continue
        if s[i] == "`":
            return i + 1
        if s[i] == "$" and i + 1 < len(s) and s[i + 1] == "{":
            i = extract_balanced(s, i + 1)
            continue
        i += 1
    return i


def extract_balanced(s: str, start: int) -> int:
    open_c = s[start]
    close_c = {"{": "}", "(": ")", "[": "]"}[open_c]
    depth = 0
    i = start
    n = len(s)
    while i < n:
        c = s[i]
        if c in "\"'":
            i = skip_string(s, i)
            continue
        if c == "`":
            i = skip_template(s, i)
            continue
        if c == "/" and i + 1 < n:
            if s[i + 1] == "/":
                i = s.find("\n", i)
                if i < 0:
                    return n
                continue
            if s[i + 1] == "*":
                j = s.find("*/", i + 2)
                i = j + 2 if j >= 0 else n
                continue
        if c == open_c:
            depth += 1
            i += 1
        elif c == close_c:
            depth -= 1
            i += 1
            if depth == 0:
                return i
        else:
            i += 1
    raise ValueError(f"unbalanced from {start}")


class Scanner:
    def __init__(self, s: str, i: int = 0):
        self.s = s
        self.i = i
        self.n = len(s)

    def peek(self) -> str:
        return self.s[self.i] if self.i < self.n else ""

    def skip_ws(self) -> None:
        while self.i < self.n and self.s[self.i] in " \t\r\n":
            self.i += 1

    def skip_line_comment(self) -> bool:
        if self.s.startswith("//", self.i):
            while self.i < self.n and self.s[self.i] != "\n":
                self.i += 1
            return True
        return False

    def skip_block_comment(self) -> bool:
        if self.s.startswith("/*", self.i):
            end = self.s.find("*/", self.i + 2)
            self.i = end + 2 if end != -1 else self.n
            return True
        return False

    def skip_noise(self) -> None:
        while True:
            self.skip_ws()
            if self.skip_line_comment() or self.skip_block_comment():
                continue
            break

    def read_string(self) -> str:
        q = self.s[self.i]
        self.i += 1
        start = self.i
        while self.i < self.n:
            c = self.s[self.i]
            if c == "\\":
                self.i += 2
                continue
            if c == q:
                val = self.s[start : self.i]
                self.i += 1
                return val
            self.i += 1
        raise ValueError("unterminated string")

    def read_template(self) -> None:
        self.i += 1
        while self.i < self.n:
            c = self.s[self.i]
            if c == "\\":
                self.i += 2
                continue
            if c == "`":
                self.i += 1
                return
            if c == "$" and self.i + 1 < self.n and self.s[self.i + 1] == "{":
                self.i += 2
                self.skip_balanced_expr()
                continue
            self.i += 1
        raise ValueError("unterminated template")

    def skip_balanced_expr(self) -> None:
        depth = 1
        while self.i < self.n and depth:
            self.skip_noise()
            if self.i >= self.n:
                break
            c = self.s[self.i]
            if c in "\"'":
                self.read_string()
            elif c == "`":
                self.read_template()
            elif c == "{":
                depth += 1
                self.i += 1
            elif c == "}":
                depth -= 1
                self.i += 1
            elif c == "/":
                if not self.maybe_regex():
                    self.i += 1
            else:
                self.i += 1

    def maybe_regex(self) -> bool:
        j = self.i - 1
        while j >= 0 and self.s[j] in " \t":
            j -= 1
        prev = self.s[j] if j >= 0 else ""
        if prev and (prev.isalnum() or prev in ')_$]"\''):
            return False
        self.i += 1
        while self.i < self.n:
            c = self.s[self.i]
            if c == "\\":
                self.i += 2
                continue
            if c == "\n":
                return True
            if c == "[":
                self.i += 1
                while self.i < self.n:
                    c2 = self.s[self.i]
                    if c2 == "\\":
                        self.i += 2
                        continue
                    if c2 == "]":
                        self.i += 1
                        break
                    self.i += 1
                continue
            if c == "/":
                self.i += 1
                while self.i < self.n and self.s[self.i].isalpha():
                    self.i += 1
                return True
            self.i += 1
        return True

    def skip_function_body(self) -> None:
        assert self.s[self.i] == "{"
        depth = 0
        while self.i < self.n:
            self.skip_noise()
            if self.i >= self.n:
                break
            c = self.s[self.i]
            if c in "\"'":
                self.read_string()
            elif c == "`":
                self.read_template()
            elif c == "{":
                depth += 1
                self.i += 1
            elif c == "}":
                depth -= 1
                self.i += 1
                if depth == 0:
                    return
            elif c == "/":
                if not self.maybe_regex():
                    self.i += 1
            else:
                self.i += 1
        raise ValueError(f"unbalanced function at {self.i}")


def parse_webpack_modules(src: str) -> list[tuple[str, str]]:
    m = re.search(r"push\(\[\[1\],\s*\{", src)
    if not m:
        raise SystemExit("Could not find webpackJsonp modules object")
    sc = Scanner(src, m.end() - 1 + 1)
    modules: list[tuple[str, str]] = []
    while True:
        sc.skip_noise()
        if sc.peek() == "}":
            break
        if sc.peek() == ",":
            sc.i += 1
            continue
        if sc.peek() in "\"'":
            key = sc.read_string()
        else:
            start = sc.i
            while sc.i < sc.n and (sc.s[sc.i].isalnum() or sc.s[sc.i] in "_$/"):
                sc.i += 1
            key = sc.s[start : sc.i]
        sc.skip_noise()
        assert sc.peek() == ":", f"expected : for key {key}"
        sc.i += 1
        sc.skip_noise()
        val_start = sc.i
        if not sc.s.startswith("function", sc.i):
            raise SystemExit(f"unexpected value for module {key}")
        sc.i += 8
        sc.skip_noise()
        assert sc.peek() == "("
        paren = 0
        while sc.i < sc.n:
            c = sc.s[sc.i]
            if c in "\"'":
                sc.read_string()
            elif c == "`":
                sc.read_template()
            elif c == "(":
                paren += 1
                sc.i += 1
            elif c == ")":
                paren -= 1
                sc.i += 1
                if paren == 0:
                    break
            else:
                sc.i += 1
        sc.skip_noise()
        assert sc.peek() == "{"
        sc.skip_function_body()
        modules.append((key, src[val_start : sc.i]))
    return modules


DATA_MAPS = [
    ("icons", "ug", "Font Awesome icon class map for UI resources and actions"),
    ("jobs", "ag", "Population jobs / specialists and their yields"),
    ("buildings", "og", "Buildings, wonders, and construction requirements"),
    ("eras", "cg", "Technology eras / ages"),
    ("sciences", "dg", "Science / technology tree"),
    ("policies", "hg", "Culture policy groups and policies"),
    ("units", "pg", "Military and civilian units"),
    ("features", "fg", "Unlockable features / sidebar navigation gates"),
    ("difficulties", "gg", "Difficulty levels and AI/barbarian modifiers"),
    ("deities", "vg", "Selectable deities"),
    ("powers", "bg", "Deity powers / abilities"),
    ("mysteries", "_g", "Deity mysteries / relic bonuses"),
    ("autoassign", "wg", "City auto-assignment strategies"),
    ("civilizations", "xg", "Playable civilizations"),
    ("upgrades", "kg", "Reincarnation / prestige upgrades"),
    ("terrains", "Cg", "Map terrain types"),
    ("improvements", "Ig", "Tile improvements (farms, mines, etc.)"),
]

CRYPTO_IDS = {
    "1uat", "3y9D", "5hvy", "ELcG", "ETIr", "F+F2", "GRuw", "Ib8C", "K3mO",
    "MlIO", "OLod", "cv67", "e7zE", "jO9C", "lPiR", "oRuE", "pA7S", "qM6L", "uGsb",
}
PAKO_IDS = {"QSbz", "cX6o", "eydS", "iTZm", "nm4c", "oXfm", "vn/o", "16wW"}


def extract_assign(src: str, var_name: str):
    for pat in [
        rf"\bconst {re.escape(var_name)} = \{{",
        rf"\blet {re.escape(var_name)} = \{{",
        rf", {re.escape(var_name)} = \{{",
        rf"\n\s*{re.escape(var_name)} = \{{",
    ]:
        m = re.search(pat, src)
        if m:
            brace = src.find("{", m.start())
            end = extract_balanced(src, brace)
            return src[brace:end], m.start(), end
    return None, None, None


def main() -> None:
    bundle = find_main_bundle()
    src = bundle.read_text()
    print(f"Reading {bundle.name} ({len(src)} bytes)")

    if OUT.exists():
        # Keep README/CONTENT if present; recreate structured dirs
        pass
    (OUT / "_raw").mkdir(parents=True, exist_ok=True)
    (OUT / "vendor" / "crypto-js").mkdir(parents=True, exist_ok=True)
    (OUT / "vendor" / "pako").mkdir(parents=True, exist_ok=True)
    (OUT / "vendor" / "misc").mkdir(parents=True, exist_ok=True)
    (OUT / "game" / "data").mkdir(parents=True, exist_ok=True)

    modules = parse_webpack_modules(src)
    print(f"Parsed {len(modules)} webpack modules")

    catalog = []
    zunb = None
    for key, value in modules:
        safe = re.sub(r"[^A-Za-z0-9_-]+", "_", key)
        path = OUT / "_raw" / f"{safe}.js"
        path.write_text(f"// webpack module: {key}\n// size: {len(value)}\n{value}\n")
        catalog.append({"id": key, "file": f"{safe}.js", "size": len(value)})
        if key == "zUnb":
            zunb = value
        dest_dir = OUT / "vendor" / (
            "crypto-js" if key in CRYPTO_IDS else "pako" if key in PAKO_IDS else "misc"
        )
        if key != "zUnb":
            shutil.copy(path, dest_dir / f"{safe}.js")

    (OUT / "module-catalog.json").write_text(json.dumps(catalog, indent=2))

    if not zunb:
        raise SystemExit("zUnb module not found")

    # Strip leading `function (...) {` wrapper already stored as full function
    # Our stored value is `function (l, n, e) { ... }` — extract body for game split
    body_start = zunb.find("{")
    body = zunb[body_start + 1 : -1] if zunb.endswith("}") else zunb

    game_start = body.find("const ug = {")
    if game_start < 0:
        raise SystemExit("Could not find game data start (const ug)")
    (OUT / "vendor" / "angular-rxjs-bundle.js").write_text(
        "// Angular + RxJS runtime extracted from zUnb (before game data)\n\n"
        + body[:game_start]
    )
    (OUT / "game" / "app-bundle.js").write_text(
        "// Cividlization 2 game application code from zUnb\n\n" + body[game_start:]
    )

    data_catalog = {}
    exports = []
    for name, var, desc in DATA_MAPS:
        obj, start, end = extract_assign(body, var)
        if not obj:
            print(f"  MISSING {var} -> {name}")
            continue
        keys = re.findall(r"\n\s{8}([A-Za-z0-9_]+):\s*\{", obj)
        out = OUT / "game" / "data" / f"{name}.js"
        out.write_text(
            f"// Reverse-engineered from webpack module zUnb\n"
            f"// Original variable: {var}\n"
            f"// {desc}\n"
            f"// Entries (~): {len(keys)}\n"
            f"// Source range: {start}-{end}\n\n"
            f"const {name} = {obj};\n\n"
            f"export default {name};\n"
        )
        data_catalog[name] = {
            "name": name,
            "var": var,
            "desc": desc,
            "entries": keys,
            "entry_count": len(keys),
            "size": len(obj),
            "file": f"game/data/{name}.js",
        }
        exports.append(f"export {{ default as {name} }} from './{name}.js';")
        print(f"  OK {name} <- {var} ({len(keys)} entries)")

    (OUT / "game" / "data" / "index.js").write_text(
        "// Auto-generated exports for reverse-engineered game data\n\n"
        + "\n".join(exports)
        + "\n"
    )
    (OUT / "game" / "data" / "catalog.json").write_text(json.dumps(data_catalog, indent=2))
    print("Done. See decompiled/README.md")


if __name__ == "__main__":
    main()
