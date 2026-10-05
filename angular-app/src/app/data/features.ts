// @ts-nocheck
// Reverse-engineered from webpack module zUnb
// Original variable: fg
// Unlockable features / sidebar navigation gates
// Entries (~): 58
// Source range: 673128-684576
/** Reconstructed game data table (`features`). Values may include runtime functions. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const features: any = {
  deity_selection: {
    name: "Deity",
    link: "/game/deity",
    check: (l) => l.hasScience("religion"),
    persistent: !1,
  },
  spells: {
    name: "Spells",
    link: "/game/help#spells",
    check: (l, n) => l.hasScience("religion") && "" != n.players[0].deity,
    persistent: !1,
  },
  daily_bonus: {
    name: "Daily Bonus",
    link: "/game/daily",
    check: (l) => l.hasScience("spirituality"),
    persistent: !0,
  },
  reincarnation: {
    name: "Reincarnation",
    link: "/game/help#reincarnation",
    check: (l, n) => l.hasScience("theology") && "" != n.players[0].deity,
    persistent: !1,
  },
  trade: {
    name: "Trade",
    link: "/game/help#trade",
    check: (l) => l.hasScience("navigation"),
    persistent: !1,
  },
  colonization: {
    name: "Colonization",
    link: "/game/help#colonization",
    check: (l) => l.hasScience("astronomy"),
    persistent: !1,
  },
  promotion: {
    name: "Cultural promotion",
    link: "/game/help#influence",
    check: (l) => l.hasScience("printing"),
    persistent: !1,
  },
  alliance: {
    name: "Alliance",
    link: "/game/help#diplomacy",
    check: (l) => l.hasScience("diplomacy"),
    persistent: !1,
  },
  diplo_global: {
    name: "Global diplomacy",
    link: "/game/diplomacy#tab_global",
    check: (l) => l.hasScience("diplomacy"),
    persistent: !1,
  },
  spy: {
    name: "Spying",
    link: "/game/help#spy",
    check: (l) => l.hasScience("monarchy"),
    persistent: !1,
  },
  queue_science: {
    name: "Science queue",
    link: "/game/science",
    check: (l, n) => n.rebirths > 0,
    persistent: !0,
  },
  empire_orders: {
    name: "Empire Orders",
    link: "/game/empire#tab_orders",
    check: (l) => l.player().cities.length > 2,
    persistent: !1,
  },
  citizen_builders: {
    name: "Builder",
    link: "/game/help#citizens",
    check: (l) => l.hasScience("tanning"),
    persistent: !1,
  },
  citizen_merchants: {
    name: "Merchant",
    link: "/game/help#citizens",
    check: (l) => l.hasScience("trade"),
    persistent: !1,
  },
  citizen_scientists: {
    name: "Scientist",
    link: "/game/help#citizens",
    check: (l) => l.hasScience("writing"),
    persistent: !1,
  },
  citizen_artists: {
    name: "Artist",
    link: "/game/help#citizens",
    check: (l) => l.hasScience("art"),
    persistent: !1,
  },
  citizen_priests: {
    name: "Priest",
    link: "/game/help#citizens",
    check: (l) => l.hasScience("religion"),
    persistent: !1,
  },
  troops: {
    name: "Troops",
    link: "/game/help#war",
    check: (l) => l.hasScience("tools"),
    persistent: !1,
  },
  buildings: {
    name: "Buildings",
    link: "/game/help#buildings",
    check: (l) => l.hasScience("tanning"),
    persistent: !1,
  },
  queue_buildings: {
    name: "Building queues",
    link: "/game/help#buildings",
    check: (l) => l.player().cities.length > 1,
    persistent: !0,
  },
  auto_building: {
    name: "Automatic building",
    link: "/game/help#buildings",
    check: (l, n) => n.rebirths > 1,
    persistent: !0,
  },
  queue_troops: {
    name: "Troop queues",
    link: "/game/help#war",
    check: (l) => l.hasScience("archery"),
    persistent: !0,
  },
  recruit_x10: {
    name: "Recruitment x10 & Auto",
    link: "/game/help#war",
    check: (l) => l.player().cities.length > 1,
    persistent: !0,
  },
  recruit_x100: {
    name: "Recruitment x100",
    link: "/game/help#war",
    check: (l, n) => n.rebirths && n.rebirths > 0,
    persistent: !0,
  },
  prod_purchase: {
    name: "Building & troops purchase",
    link: "/game/city",
    check: (l) => l.hasScience("writing"),
    persistent: !1,
  },
  menu_empire: {
    name: "Empire panel",
    link: "/game/empire",
    check: (l) => l.hasScience("state"),
    persistent: !1,
  },
  menu_world: {
    name: "World panel",
    link: "/game/world",
    check: (l) => l.hasScience("exploration"),
    persistent: !1,
  },
  menu_policies: {
    name: "Social Policies",
    link: "/game/policies",
    check: (l) => l.hasScience("art"),
    persistent: !1,
  },
  menu_powers: {
    name: "Powers",
    link: "/game/powers",
    check: (l, n) => l.isUnlocked("reincarnation") || n.rebirths > 0,
    persistent: !0,
  },
  menu_diplomacy: {
    name: "Diplomacy",
    link: "/game/diplomacy",
    check: (l) => l.hasScience("navigation"),
    persistent: !1,
  },
  menu_simulator: {
    name: "Battle Simulator",
    link: "/game/simulator",
    check: (l) => l.hasScience("tactics"),
    persistent: !1,
  },
  orientation: {
    name: "Technology",
    link: "/game/empire#tab_orientation",
    check: (l) => l.hasScienceRank(16),
    persistent: !1,
  },
  era_ancient: {
    name: "Ancient Era",
    link: "/game/science",
    check: (l) => l.hasScienceRank(3),
    persistent: !0,
  },
  era_classical: {
    name: "Classical Era",
    link: "/game/science",
    check: (l) => l.hasScienceRank(6),
    persistent: !0,
  },
  era_medieval: {
    name: "Medieval Era",
    link: "/game/science",
    check: (l) => l.hasScienceRank(9),
    persistent: !0,
  },
  era_renaissance: {
    name: "Renaissance Era",
    link: "/game/science",
    check: (l) => l.hasScienceRank(12),
    persistent: !0,
  },
  era_industrial: {
    name: "Industrial Era",
    link: "/game/science",
    check: (l) => l.hasScienceRank(15),
    persistent: !0,
  },
  era_future: {
    name: "Future Era",
    link: "/game/science",
    check: (l) => l.hasScienceRank(18),
    persistent: !0,
  },
  spell_newfire: {
    name: "Spell: New Fire",
    link: "/game/help#spells",
    check: (l) => "coatlicue" == l.player().deity && l.pop() >= 30,
    persistent: !0,
  },
  spell_sacrifice: {
    name: "Spell: Sacrifice",
    link: "/game/help#spells",
    check: (l, n) =>
      "coatlicue" == l.player().deity &&
      n.charging.newfire &&
      n.charging.newfire >= 50,
    persistent: !0,
  },
  spell_tradenode: {
    name: "Spell: Trade Node",
    link: "/game/help#spells",
    check: (l, n) => "horus" == l.player().deity && l.goldTotal() >= 3e6,
    persistent: !0,
  },
  spell_seshat: {
    name: "Spell: Sechat's Wisdom",
    link: "/game/help#spells",
    check: (l, n) => "horus" == l.player().deity && l.tradeRouteNb() >= 15,
    persistent: !0,
  },
  spell_berserker: {
    name: "Spell: Berserker",
    link: "/game/help#spells",
    check: (l, n) => "odin" == l.player().deity && l.totalTroopNb() >= 500,
    persistent: !0,
  },
  spell_appropriation: {
    name: "Spell: Appropriation",
    link: "/game/help#spells",
    check: (l, n) => "odin" == l.player().deity && n.burnNb >= 5,
    persistent: !0,
  },
  spell_enlightment: {
    name: "Spell: Enlightment",
    link: "/game/help#spells",
    check: (l) => "shiva" == l.player().deity && l.pop(l.capital()) >= 8,
    persistent: !0,
  },
  spell_maha: {
    name: "Spell: Maha Shivaratri",
    link: "/game/help#spells",
    check: (l) => "shiva" == l.player().deity && l.wondersNb() >= 10,
    persistent: !0,
  },
  spell_dionysia: {
    name: "Spell: Dionysia",
    link: "/game/help#spells",
    check: (l) => "dionysus" == l.player().deity && l.player().culture >= 1e5,
    persistent: !0,
  },
  spell_bacchanalia: {
    name: "Spell: Bacchanalia",
    link: "/game/help#spells",
    check: (l) => "dionysus" == l.player().deity && l.colonyNb() >= 15,
    persistent: !0,
  },
  spell_punisher: {
    name: "Spell: The Punisher",
    link: "/game/help#spells",
    check: (l, n) => "batara" == l.player().deity && n.plagueNb >= 1,
    persistent: !0,
  },
  spell_devourer: {
    name: "Spell: Devourer of the Sun",
    link: "/game/help#spells",
    check: (l, n) => "batara" == l.player().deity && n.plagueMaxCities >= 20,
    persistent: !0,
  },
  autocast: {
    name: "Autocast Spell",
    link: "/game/help#spells",
    check: (l) => l.player().orientation <= -100,
    persistent: !1,
  },
  improvements: {
    name: "Tile Improvements",
    link: "/game/help#improvements",
    check: (l) => l.hasScience("bronze_working"),
    persistent: !1,
  },
  improvements2: {
    name: "Advanced Tile Improvements",
    link: "/game/help#improvements",
    check: (l) =>
      l.hasScience("industrialization") && l.player().orientation >= 50,
    persistent: !1,
  },
  timetravel: {
    name: "Time Travel",
    link: "/game/help#technology",
    check: (l) => l.player().orientation > 0,
    persistent: !1,
  },
  indusbuildings: {
    name: "Industrial Buildings",
    link: "/game/help#technology",
    check: (l) => l.player().orientation >= 25,
    persistent: !1,
  },
  indusimpr: {
    name: "Industrial Improvements",
    link: "/game/help#technology",
    check: (l) => l.player().orientation >= 50,
    persistent: !1,
  },
  induswonders: {
    name: "Industrial Wonders",
    link: "/game/help#technology",
    check: (l) => l.player().orientation >= 75,
    persistent: !1,
  },
  archeology: {
    name: "Archeology",
    link: "/game/help#archeology",
    check: (l) =>
      l.hasScience("archeology", l.player()) && l.player().orientation >= 100,
    persistent: !1,
  },
};
