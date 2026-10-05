// @ts-nocheck
// Reverse-engineered from webpack module zUnb
// Original variable: ag
// Population jobs / specialists and their yields
// Entries (~): 7
// Source range: 558340-560370
/** Reconstructed game data table (`jobs`). Values may include runtime functions. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jobs: any = {
  idle: {
    id: "idle",
    name: () => "Idle",
    food: (l, n) => 1 + l.idlersBonus(n.ownerid),
    culture: (l, n = 0) => Math.floor(5 * l.idlersBonus(n)) / 10,
    happiness: (l, n = 0) => l.idlersBonus(n) / 100,
  },
  farmers: {
    id: "farmers",
    name: (l) =>
      l.hasScience("agriculture") ? "Farmers" : "Hunters-Gatherers",
    food: (l, n) =>
      1.5 +
      (l.hasScience("dog_domestication", l.player(n.ownerid)) ? 0.5 : 0) +
      (l.hasScience("agriculture", l.player(n.ownerid)) ? 1 : 0) +
      (l.hasScience("crop_rotation", l.player(n.ownerid)) ? 1 : 0) +
      (l.hasScience("fertilizer", l.player(n.ownerid)) ? 2 : 0) +
      l.improvements(n, 1) +
      2 * l.improvements(n, 2),
  },
  builders: {
    id: "builders",
    name: () => "Builders",
    prod: (l, n) =>
      1 +
      (l.hasScience("navigation", l.player(n.ownerid)) ? 0.5 : 0) +
      (l.hasWonder(n.ownerid, "temple_artemis") ? 1 : 0) +
      l.improvements(n, 3) +
      2 * l.improvements(n, 4),
  },
  merchants: {
    id: "merchants",
    name: () => "Merchants",
    gold: (l, n) =>
      1 +
      (l.hasScience("wheel", l.player(n.ownerid)) ? 1 : 0) +
      l.improvements(n, 7),
  },
  scientists: {
    id: "scientists",
    name: (l) => (l.hasScience("engineering") ? "Scientists" : "Scholars"),
    science: (l, n) =>
      1 +
      (l.hasScience("engineering", l.player(n.ownerid)) ? 1 : 0) +
      (l.hasPolicyGroup("rationalism", n.ownerid) ? 1 : 0) +
      l.improvements(n, 8),
    health: (l, n) => (l.hasPolicy("who", n) ? 0.08 : 0),
  },
  artists: {
    id: "artists",
    name: () => "Artists",
    culture: (l, n = 0) => 1 + (l.hasScience("drama", l.player(n)) ? 0.5 : 0),
    happiness: (l) => 0.08,
  },
  priests: {
    id: "priests",
    name: () => "Priests",
    faith: (l, n = 0) => 1 + (l.hasScience("theology", l.player(n)) ? 0.5 : 0),
  },
};
