// @ts-nocheck
// Reverse-engineered from webpack module zUnb
// Original variable: og
// Buildings, wonders, and construction requirements
// Entries (~): 81
// Source range: 560370-602613
import { icons as ug } from './icons';

/** Reconstructed game data table (`buildings`). Values may include runtime functions. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildings: any = {
  lo: {
    id: "lo",
    oid: "longhouse",
    label: () => "Longhouse",
    description: () =>
      '15% <span class="text-food"><i class="' +
      ug.food +
      '"></i></span> kept after growth',
    category: "administration",
    require: {
      science: "tanning",
      buildings: [],
    },
    free: !0,
  },
  town_hall: {
    id: "town_hall",
    label: () => "Town Hall",
    description: () =>
      '25% <span class="text-food"><i class="' +
      ug.food +
      '"></i></span> kept after growth<br/>Require to recruit <span class="text-troop">Governors</span>',
    category: "administration",
    require: {
      science: "state",
      buildings: ["lo", "granary", "monument"],
    },
  },
  police: {
    id: "police",
    label: () => "Police Station",
    description: () => "Reduce revolt risk by 50%",
    category: "administration",
    require: {
      science: "gunpowder",
      buildings: ["town_hall", "library", "furnace", "hospital"],
    },
  },
  palace: {
    id: "palace",
    label: () => "Palace",
    description: () =>
      'Only available in Capital City<br/><span class="text-food"><i class="' +
      ug.food +
      '"></i> +2</span><br/><span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +2</span><br/><span class="text-prod"><i class="' +
      ug.prod +
      '"></i> +2</span><br/><span class="text-gold"><i class="' +
      ug.gold +
      '"></i> +2</span><br/><span class="text-science"><i class="' +
      ug.science +
      '"></i> +2</span>',
    desc: () =>
      '<span class="text-food"><i class="' +
      ug.food +
      '"></i> +2</span> | <span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +2</span> | <span class="text-prod"><i class="' +
      ug.prod +
      '"></i> +2</span> | <span class="text-gold"><i class="' +
      ug.gold +
      '"></i> +2</span> | <span class="text-science"><i class="' +
      ug.science +
      '"></i> +2</span>',
    category: "administration",
    require: {
      science: "masonry",
      buildings: ["town_hall", "walls", "gardens", "stables", "treasury"],
    },
  },
  tribunal: {
    id: "tribunal",
    label: () => "Tribunal",
    description: () => "Reduce discontent due to distance from capital by 50%",
    category: "administration",
    require: {
      science: "code_of_laws",
      buildings: ["town_hall"],
    },
  },
  courthouse: {
    id: "courthouse",
    label: () => "Courthouse",
    description: () => "Reduce discontent due to distance from capital by 50%",
    category: "administration",
    require: {
      science: "architecture",
      buildings: ["town_hall", "tribunal"],
    },
  },
  monument: {
    id: "monument",
    label: () => "Monument",
    description: () =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +1</span><br/><span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +2 / trade route</span>',
    desc: () =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +1</span> | <span class="text-culture"><i class="' +
      ug.trade +
      '"></i> <i class="' +
      ug.culture +
      '"></i> +2</span>',
    category: "culture",
    require: {
      science: "art",
      buildings: ["lo"],
    },
  },
  amphitheatre: {
    id: "amphitheatre",
    label: () => "Amphitheatre",
    description: () =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +2</span><br/><span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +5 / trade route</span>',
    desc: () =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +2</span> | <span class="text-culture"><i class="' +
      ug.trade +
      '"></i> <i class="' +
      ug.culture +
      '"></i> +5</span>',
    category: "culture",
    require: {
      science: "wheel",
      buildings: ["town_hall"],
    },
  },
  opera: {
    id: "opera",
    label: () => "Opera",
    description: () =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +5</span><br/><span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +10 / trade route</span>',
    desc: () =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +5</span> | <span class="text-culture"><i class="' +
      ug.trade +
      '"></i> <i class="' +
      ug.culture +
      '"></i> +10</span>',
    category: "culture",
    require: {
      science: "acoustics",
      buildings: ["amphitheatre", "town_hall"],
    },
  },
  museum: {
    id: "museum",
    label: () => "Museum",
    description: () =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +10</span><br/><span class="text-relics"><i class="' +
      ug.relics +
      '"></i> Relics</span> gain +50%',
    desc: () =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +10</span> | <span class="text-relics"><i class="' +
      ug.relics +
      '"></i> +50%</span>',
    category: "culture",
    require: {
      science: "archeology",
      buildings: ["amphitheatre", "town_hall"],
    },
    industrial: !0,
  },
  walls: {
    id: "walls",
    label: () => "Walls",
    description: () => '<div><i class="' + ug.defense + '"></i> +50%</div>',
    desc: () => '<span><i class="' + ug.defense + '"></i> +50%</span>',
    category: "defense",
    require: {
      science: "masonry",
      buildings: ["lo"],
    },
  },
  castle: {
    id: "castle",
    label: (l) => ("french" == l.civ_id ? "Chateau" : "Castle"),
    description: (l, n) =>
      '<div><i class="' +
      ug.defense +
      '"></i> +50%</div>' +
      ("french" == n.player(l).civ_id
        ? '<div class="text-gold"><i class="' +
          ug.gold +
          '"></i> +10</div><div class="text-culture"><i class="' +
          ug.culture +
          '"></i> +10</div>'
        : ""),
    desc: (l, n) =>
      '<span><i class="' +
      ug.defense +
      '"></i> +50%</span>' +
      ("french" == n.player(l).civ_id
        ? ' | <span class="text-gold"><i class="' +
          ug.gold +
          '"></i> +10</span> | <span class="text-culture"><i class="' +
          ug.culture +
          '"></i> +10</span>'
        : ""),
    category: "defense",
    require: {
      science: "advanced_fortification",
      buildings: ["town_hall", "walls"],
    },
  },
  fortress: {
    id: "fortress",
    label: () => "Fortress",
    description: () => '<div><i class="' + ug.defense + '"></i> +50%</div>',
    desc: () => '<span><i class="' + ug.defense + '"></i> +50%</span>',
    category: "defense",
    require: {
      science: "siege",
      buildings: ["town_hall", "castle"],
    },
  },
  embassy: {
    id: "embassy",
    label: () => "Embassy",
    description: () =>
      '<div class="text-diplomacy"><i class="' +
      ug.diplomacy +
      '"></i> +1 / trade route</div>',
    desc: () =>
      '<span class="text-diplomacy"><i class="' +
      ug.diplomacy +
      '"></i> +1</span>',
    category: "diplomacy",
    require: {
      science: "diplomacy",
      buildings: ["town_hall"],
    },
  },
  consulate: {
    id: "consulate",
    label: () => "Consulate",
    description: () =>
      '<div class="text-diplomacy"><i class="' +
      ug.diplomacy +
      '"></i> +1 / trade route</div>',
    desc: () =>
      '<span class="text-diplomacy"><i class="' +
      ug.diplomacy +
      '"></i> +1</span>',
    category: "diplomacy",
    require: {
      science: "republic",
      buildings: ["town_hall", "embassy"],
    },
  },
  shrine: {
    id: "shrine",
    label: () => "Shrine",
    description: (l, n) =>
      '<div>Wonders <i class="' +
      ug.prod +
      ' text-prod"></i> cost -5%</div>' +
      (n
        ? '<div class="text-faith"><i class="' +
          ug.faith +
          '"></i> +' +
          (n.hasPolicyGroup("piety") ? 3 : 1) +
          "</div>" +
          (n.hasPolicy("secularism")
            ? '<div class="text-happiness"><i class="' +
              ug.happiness +
              '"></i> +5%</div>'
            : "")
        : '<div class="text-faith"><i class="' + ug.faith + '"></i> +1</div>'),
    desc: (l, n) =>
      '<span class="text-faith"><i class="' +
      ug.faith +
      '"></i> +' +
      (n.hasPolicyGroup("piety") ? 3 : 1) +
      "</span>" +
      (n.hasPolicy("secularism")
        ? ' | <span class="text-happiness"><i class="' +
          ug.happiness +
          '"></i> +5%</span>'
        : ""),
    category: "faith",
    require: {
      science: "spirituality",
      buildings: ["lo"],
    },
  },
  temple: {
    id: "temple",
    label: () => "Temple",
    description: (l, n) =>
      '<div class="text-faith"><i class="' +
      ug.faith +
      '"></i> +5</div>' +
      (n && n.hasPolicy("organized_religion")
        ? '<div class="text-health"><i class="' + ug.health + '"></i> +5%</div>'
        : ""),
    desc: (l, n) =>
      '<span class="text-faith"><i class="' +
      ug.faith +
      '"></i> +5</span>' +
      (n.hasPolicy("organized_religion")
        ? ' | <span class="text-health"><i class="' +
          ug.health +
          '"></i> +5%</span>'
        : ""),
    category: "faith",
    require: {
      science: "religion",
      buildings: ["town_hall", "shrine"],
    },
  },
  monastery: {
    id: "monastery",
    label: () => "Monastery",
    description: (l, n) =>
      '<div class="text-faith"><i class="' +
      ug.faith +
      '"></i> +15</div>' +
      (n && n.hasPolicy("theocracy")
        ? '<div class="text-happiness"><i class="' +
          ug.happiness +
          '"></i> +5%</div>'
        : "") +
      (n && n.hasPolicy("reformation")
        ? '<div class="text-science"><i class="' +
          ug.science +
          '"></i> +10%</div><div class="text-faith"><i class="' +
          ug.faith +
          '"></i> +10%</div>'
        : ""),
    desc: (l, n) =>
      '<span class="text-faith"><i class="' +
      ug.faith +
      '"></i> +15</span>' +
      (n.hasPolicy("theocracy")
        ? ' | <span class="text-happiness"><i class="' +
          ug.happiness +
          '"></i> +5%</span>'
        : "") +
      (n.hasPolicy("reformation")
        ? ' | <span class="text-science"><i class="' +
          ug.science +
          '"></i> +10%</span> | <span class="text-faith"><i class="' +
          ug.faith +
          '"></i> +10%</span>'
        : ""),
    category: "faith",
    require: {
      science: "theology",
      buildings: ["town_hall", "temple"],
    },
  },
  granary: {
    id: "granary",
    label: (l) => ("incans" == l.civ_id ? "Terrace" : "Granary"),
    description: (l, n) =>
      '<div class="text-food"><i class="' +
      ug.food +
      '"></i> +' +
      n.buildingBonus("granary", l) +
      "</div>",
    desc: (l, n) =>
      '<span class="text-food"><i class="' +
      ug.food +
      '"></i> +' +
      n.buildingBonus("granary", l) +
      "</span>",
    bonus: (l) => ("incans" == l.civ_id ? 5 : 2),
    category: "food",
    require: {
      science: "agriculture",
      buildings: ["lo"],
    },
  },
  port: {
    id: "port",
    label: () => "Harbor",
    description: () =>
      '<div class="text-food"><i class="' + ug.food + '"></i> +5</div>',
    desc: () =>
      '<span class="text-food"><i class="' + ug.food + '"></i> +5</span>',
    category: "food",
    require: {
      science: "navigation",
      buildings: ["lo"],
    },
    coastal: !0,
  },
  mill: {
    id: "mill",
    label: () => "Mill",
    description: () =>
      '<div class="text-food"><i class="' + ug.food + '"></i> +10</div>',
    desc: () =>
      '<span class="text-food"><i class="' + ug.food + '"></i> +10</span>',
    category: "food",
    require: {
      science: "milling",
      buildings: ["town_hall", "granary"],
    },
  },
  cop: {
    id: "cop",
    oid: "copper_mine",
    label: () => "Copper Mine",
    description: () =>
      '<div class="text-gold"><i class="' + ug.gold + '"></i> +5</div>',
    desc: () =>
      '<span class="text-gold"><i class="' + ug.gold + '"></i> +5</span>',
    category: "gold",
    require: {
      science: "bronze_working",
      buildings: ["lo"],
    },
  },
  go: {
    id: "go",
    oid: "gold_mine",
    label: () => "Gold Mine",
    description: () =>
      '<div class="text-gold"><i class="' + ug.gold + '"></i> +15</div>',
    desc: () =>
      '<span class="text-gold"><i class="' + ug.gold + '"></i> +15</span>',
    category: "gold",
    require: {
      science: "iron_working",
      buildings: ["town_hall", "cop"],
    },
  },
  coa: {
    id: "coa",
    oid: "coal_mine",
    label: () => "Coal Mine",
    description: () =>
      '<div class="text-gold"><i class="' + ug.gold + '"></i> +25</div>',
    desc: () =>
      '<span class="text-gold"><i class="' + ug.gold + '"></i> +25</span>',
    category: "gold",
    require: {
      science: "steam",
      buildings: ["police", "go"],
    },
    industrial: !0,
  },
  market: {
    id: "market",
    label: () => "Market",
    description: () =>
      '<div class="text-gold"><i class="' +
      ug.gold +
      '"></i> +2 / trade route</div>',
    desc: () =>
      '<span class="text-gold"><i class="' +
      ug.trade +
      '"></i><i class="' +
      ug.gold +
      '"></i> +2</span>',
    category: "gold_trade",
    require: {
      science: "mathematics",
      buildings: ["town_hall"],
    },
  },
  bank: {
    id: "bank",
    label: (l) => ("ottomans" == l.civ_id ? "Bazaar" : "Bank"),
    description: (l, n) =>
      '<div class="text-gold"><i class="' +
      ug.gold +
      '"></i> +' +
      n.buildingBonus("bank", l) +
      " / trade route</div>",
    desc: (l, n) =>
      '<span class="text-gold"><i class="' +
      ug.trade +
      '"></i><i class="' +
      ug.gold +
      '"></i> +' +
      n.buildingBonus("bank", l) +
      "</span>",
    bonus: (l) => (l && "ottomans" == l.civ_id ? 10 : 5),
    category: "gold_trade",
    require: {
      science: "currency",
      buildings: ["town_hall", "market"],
    },
  },
  stock: {
    id: "stock",
    label: () => "Stock Exchange",
    description: () =>
      '<div class="text-gold"><i class="' +
      ug.gold +
      '"></i> +10 / trade route</div>',
    desc: () =>
      '<span class="text-gold"><i class="' +
      ug.trade +
      '"></i><i class="' +
      ug.gold +
      '"></i> +10</span>',
    category: "gold_trade",
    require: {
      science: "economics",
      buildings: ["town_hall", "bank"],
    },
  },
  chest: {
    id: "chest",
    label: () => "Chest",
    description: () =>
      'Increase <span class="text-gold"><i class="' +
      ug.gold +
      '"></i></span> limit to 1 000',
    category: "gold_limit",
    require: {
      science: "mining",
      buildings: ["lo"],
    },
  },
  treasury: {
    id: "treasury",
    label: () => "Treasury",
    description: () =>
      'Increase <span class="text-gold"><i class="' +
      ug.gold +
      '"></i></span> limit to 1M',
    category: "gold_limit",
    require: {
      science: "writing",
      buildings: ["lo", "chest"],
    },
  },
  mint: {
    id: "mint",
    label: () => "Mint",
    description: () =>
      'Increase <span class="text-gold"><i class="' +
      ug.gold +
      '"></i></span> limit to 100M',
    category: "gold_limit",
    require: {
      science: "currency",
      buildings: ["town_hall", "treasury"],
    },
  },
  reserve: {
    id: "reserve",
    label: () => "Gold Reserve",
    description: () =>
      'Increase <span class="text-gold"><i class="' +
      ug.gold +
      '"></i></span> limit to 10B',
    category: "gold_limit",
    require: {
      science: "corporation",
      buildings: ["police", "mint"],
    },
    industrial: !0,
  },
  gardens: {
    id: "gardens",
    label: (l) => ("indonesians" == l.civ_id ? "Candi" : "Gardens"),
    description: (l, n) =>
      '<div class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +' +
      100 * n.buildingBonus("gardens", l) +
      "%</div>",
    desc: (l, n) =>
      '<span class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +' +
      100 * n.buildingBonus("gardens", l) +
      "%</span>",
    bonus: (l) => (l && "indonesians" == l.civ_id ? 0.1 : 0.05),
    category: "happiness",
    require: {
      science: "crop_rotation",
      buildings: ["lo"],
    },
  },
  theatre: {
    id: "theatre",
    label: () => "Theatre",
    description: () =>
      '<div class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +10%</div>',
    desc: () =>
      '<span class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +10%</span>',
    category: "happiness",
    require: {
      science: "drama",
      buildings: ["town_hall", "gardens"],
    },
  },
  circus: {
    id: "circus",
    label: () => "Circus",
    description: () =>
      '<div class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +15%</div>',
    desc: () =>
      '<span class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +15%</span>',
    category: "happiness",
    require: {
      science: "music_theory",
      buildings: ["town_hall", "theatre"],
    },
  },
  zoo: {
    id: "zoo",
    label: (l) => ("brazilians" == l.civ_id ? "Carnival" : "Zoo"),
    description: (l, n) =>
      '<div class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +15%</div>' +
      ("brazilians" == n.player(l).civ_id
        ? '<div class="text-culture"><i class="' +
          ug.culture +
          '"></i> +10</div>'
        : ""),
    desc: (l, n) =>
      '<span class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +15%</span>' +
      ("brazilians" == n.player(l).civ_id
        ? ' | <span class="text-culture"><i class="' +
          ug.culture +
          '"></i> +10</span>'
        : ""),
    category: "happiness",
    require: {
      science: "rigging",
      buildings: ["town_hall", "circus"],
    },
  },
  well: {
    id: "well",
    label: () => "Well",
    description: () =>
      '<div class="text-health"><i class="' + ug.health + '"></i> +5%</div>',
    desc: () =>
      '<span class="text-health"><i class="' + ug.health + '"></i> +5%</span>',
    category: "health",
    require: {
      science: "masonry",
      buildings: ["lo"],
    },
  },
  aqueduct: {
    id: "aqueduct",
    label: () => "Aqueduct",
    description: () =>
      '<div class="text-health"><i class="' +
      ug.health +
      '"></i> +10%</div><div>Increase Plague Doctors efficiency</div>',
    desc: () =>
      '<span class="text-health"><i class="' + ug.health + '"></i> +10%</span>',
    category: "health",
    require: {
      science: "construction",
      buildings: ["town_hall", "well"],
    },
  },
  hospital: {
    id: "hospital",
    label: () => "Hospital",
    description: (l, n) =>
      '<div class="text-health"><i class="' +
      ug.health +
      '"></i> +' +
      (n && n.hasPolicy("procedures") ? "20" : "15") +
      "%</div><div>Increase Plague Doctors efficiency</div>",
    desc: (l, n) =>
      '<span class="text-health"><i class="' +
      ug.health +
      '"></i> +' +
      (n && n.hasPolicy("procedures") ? "20" : "15") +
      "%</span>",
    category: "health",
    require: {
      science: "anatomy",
      buildings: ["town_hall", "aqueduct"],
    },
  },
  dispensary: {
    id: "dispensary",
    label: () => "Dispensary",
    description: () =>
      '<div class="text-health"><i class="' + ug.health + '"></i> +20%</div>',
    desc: () =>
      '<span class="text-health"><i class="' + ug.health + '"></i> +20%</span>',
    category: "health",
    require: {
      science: "biology",
      buildings: ["police", "hospital"],
    },
    industrial: !0,
  },
  quarantine: {
    id: "quarantine",
    label: () => "Quarantine Station",
    description: () =>
      '<div class="text-health"><i class="' +
      ug.health +
      '"></i> +10%</div><div>Prevents Plague propagation</div>',
    desc: () =>
      '<span class="text-health"><i class="' + ug.health + '"></i> +10%</span>',
    category: "health",
    require: {
      science: "sanitation",
      buildings: ["police", "hospital"],
    },
    industrial: !0,
  },
  armory: {
    id: "armory",
    label: () => "Armory",
    description: () => "Reduce troop maintenance in this city by half",
    category: "military",
    require: {
      science: "steel",
      buildings: ["town_hall", "barracks"],
    },
  },
  barracks: {
    id: "barracks",
    label: () => "Barracks",
    description: (l, n) =>
      "Allow recruitment of melee & ranged units" +
      (n && n.hasPolicy("despotism")
        ? '<div class="text-happiness"><i class="' +
          ug.happiness +
          '"></i> +5%</div>'
        : ""),
    desc: (l, n) =>
      n.hasPolicy("despotism")
        ? '<span class="text-happiness"><i class="' +
          ug.happiness +
          '"></i> +5%</span>'
        : "",
    category: "military",
    require: {
      science: "tools",
      buildings: ["lo"],
    },
  },
  stables: {
    id: "stables",
    label: () => "Stables",
    description: () => "Allow recruitment of mounted units",
    category: "military",
    require: {
      science: "horseriding",
      buildings: ["lo"],
    },
  },
  sif: {
    id: "sif",
    oid: "siege_factory",
    label: () => "Siege Factory",
    description: () => "Allow recruitment of siege units",
    category: "military",
    require: {
      science: "mathematics",
      buildings: ["town_hall"],
    },
  },
  seaport: {
    id: "seaport",
    label: () => "Seaport",
    description: () => "Allow recruitment of naval units",
    category: "military",
    require: {
      science: "astronomy",
      buildings: ["town_hall"],
    },
    coastal: !0,
  },
  trc: {
    id: "trc",
    oid: "training_center",
    label: () => "Training Center",
    description: () => "Increase recruitment speed by 25%",
    category: "military",
    require: {
      science: "armies",
      buildings: ["lo"],
    },
  },
  mia: {
    id: "mia",
    oid: "military_academy",
    label: () => "Military Academy",
    description: () => "Increase recruitment speed by 25%",
    category: "military",
    require: {
      science: "chivalry",
      buildings: ["town_hall", "trc"],
    },
  },
  arsenal: {
    id: "arsenal",
    label: () => "Arsenal",
    description: () => "Increase recruitment speed by 25%",
    category: "military",
    require: {
      science: "production",
      buildings: ["town_hall", "mia"],
    },
  },
  workshop: {
    id: "workshop",
    label: (l) =>
      l && "egyptians" == l.civ_id ? "Granite quarry" : "Workshop",
    description: (l, n) =>
      '<div class="text-prod"><i class="' +
      ug.prod +
      '"></i> +' +
      n.buildingBonus("workshop", l) +
      "</div>",
    desc: (l, n) =>
      '<span class="text-prod"><i class="' +
      ug.prod +
      '"></i> +' +
      n.buildingBonus("workshop", l) +
      "</span>",
    bonus: (l) => (l && "egyptians" == l.civ_id ? 10 : 5),
    category: "production",
    require: {
      science: "bronze_working",
      buildings: ["town_hall"],
    },
  },
  furnace: {
    id: "furnace",
    label: () => "Furnace",
    description: () =>
      '<div class="text-prod"><i class="' + ug.prod + '"></i> +15</div>',
    desc: () =>
      '<span class="text-prod"><i class="' + ug.prod + '"></i> +15</span>',
    category: "production",
    require: {
      science: "iron_working",
      buildings: ["town_hall", "workshop"],
    },
  },
  ironworks: {
    id: "ironworks",
    label: (l) => (l && "germans" == l.civ_id ? "Hanse" : "Ironworks"),
    description: (l, n) =>
      '<div class="text-prod"><i class="' +
      ug.prod +
      '"></i> +' +
      n.buildingBonus("ironworks", l) +
      "</div>",
    desc: (l, n) =>
      '<span class="text-prod"><i class="' +
      ug.prod +
      '"></i> +' +
      n.buildingBonus("ironworks", l) +
      "</span>",
    bonus: (l) => (l && "germans" == l.civ_id ? 40 : 25),
    category: "production",
    require: {
      science: "metallurgy",
      buildings: ["town_hall", "furnace"],
    },
  },
  factory: {
    id: "factory",
    label: () => "Factory",
    description: () =>
      '<div class="text-prod"><i class="' + ug.prod + '"></i> +50</div>',
    desc: () =>
      '<span class="text-prod"><i class="' + ug.prod + '"></i> +50</span>',
    category: "production",
    require: {
      science: "industrialization",
      buildings: ["police", "ironworks"],
    },
    industrial: !0,
  },
  hydro: {
    id: "hydro",
    label: () => "Hydro Plant",
    description: () =>
      '<div class="text-prod"><i class="' + ug.prod + '"></i> +50</div>',
    desc: () =>
      '<span class="text-prod"><i class="' + ug.prod + '"></i> +50</span>',
    category: "production",
    require: {
      science: "electricity",
      buildings: ["police", "factory"],
    },
    industrial: !0,
  },
  progress: {
    id: "progress",
    label: () => "Progress",
    description: () =>
      'Can be built repeatedly.<br/>Produce <span class="text-progress"><i class="' +
      ug.progress +
      '"></i> Progress</span>',
    desc: () =>
      '<span class="text-progress"><i class="' +
      ug.progress +
      '"></i> +1</span>',
    category: "production",
    require: {
      science: "industrialization",
      buildings: ["police"],
    },
    free: !0,
  },
  library: {
    id: "library",
    label: (l) => (l && "chinese" == l.civ_id ? "Paper Maker" : "Library"),
    description: (l, n) =>
      '<div class="text-science"><i class="' +
      ug.science +
      '"></i> +' +
      n.buildingBonus("library", l) +
      "</div>" +
      (n && n.hasPolicy("philosophy")
        ? '<div class="text-culture"><i class="' +
          ug.culture +
          '"></i> +5%</div>'
        : ""),
    desc: (l, n) =>
      '<span class="text-science"><i class="' +
      ug.science +
      '"></i> +' +
      n.buildingBonus("library", l) +
      "</span>" +
      (n.hasPolicy("philosophy")
        ? ' | <span class="text-culture"><i class="' +
          ug.culture +
          '"></i> +5%</div>'
        : ""),
    bonus: (l, n) => {
      let e = 5;
      return (
        n.hasWonder(l.id, "great_library") && (e += 5),
        l && "chinese" == l.civ_id && (e += 5),
        e
      );
    },
    category: "science",
    require: {
      science: "literature",
      buildings: ["town_hall"],
    },
  },
  uni: {
    id: "uni",
    oid: "university",
    label: () => "University",
    description: (l, n) =>
      '<div class="text-science"><i class="' +
      ug.science +
      '"></i> +15</div>' +
      (n && n.hasPolicy("scientific_state")
        ? '<div class="text-science"><i class="' +
          ug.science +
          '"></i> +10%</div><div class="text-faith"><i class="' +
          ug.faith +
          '"></i> +10%</div>'
        : ""),
    desc: (l, n) =>
      '<span class="text-science"><i class="' +
      ug.science +
      '"></i> +15</span>' +
      (n.hasPolicy("scientific_state")
        ? '| <span class="text-science"><i class="' +
          ug.science +
          '"></i> +10%</span> | <span class="text-faith"><i class="' +
          ug.faith +
          '"></i> +10%</span>'
        : ""),
    category: "science",
    require: {
      science: "education",
      buildings: ["town_hall", "library"],
    },
  },
  school: {
    id: "school",
    label: () => "Public School",
    description: () =>
      '<div class="text-science"><i class="' + ug.science + '"></i> +25</div>',
    desc: () =>
      '<span class="text-science"><i class="' +
      ug.science +
      '"></i> +25</span>',
    category: "science",
    require: {
      science: "scientific",
      buildings: ["police", "uni"],
    },
    industrial: !0,
  },
  pyramid: {
    id: "pyramid",
    label: () => "Pyramids",
    description: () =>
      '<div>Free Granary in each of your cities</div><div class="text-culture"><i class="' +
      ug.culture +
      '"></i>+5</div><div class="text-faith"><i class="' +
      ug.faith +
      '"></i>+2 for each wonder in this city</div>',
    desc: (l, n, e) =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +5</span> | <span class="text-faith"><i class="' +
      ug.faith +
      '"></i> +' +
      2 * n.wondersNbInCity(e) +
      "</span>",
    add_all: "granary",
    category: "_wonder",
    wonder: !0,
    require: {
      science: "herding",
      buildings: ["lo"],
    },
  },
  colossus: {
    id: "colossus",
    label: () => "Colossus",
    description: () =>
      '<div class="text-gold"><i class="' +
      ug.gold +
      '"></i> +10</div><div class="text-trade"><i class="' +
      ug.trade +
      '"></i> +1</div>',
    desc: () =>
      '<span class="text-gold"><i class="' +
      ug.gold +
      '"></i> +10</span> | <span class="text-trade"><i class="' +
      ug.trade +
      '"></i> +1</span>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "bronze_working",
      buildings: ["lo"],
    },
  },
  hanging_gardens: {
    id: "hanging_gardens",
    label: () => "Hanging Gardens",
    description: () =>
      '<div class="text-food"><i class="' +
      ug.food +
      '"></i> +10</div><div class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +10%</div><div>Free Garden in the city in which it was built</div>',
    desc: () =>
      '<span class="text-food"><i class="' +
      ug.food +
      '"></i> +10</span> | <span class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +1</span>',
    add_city: "gardens",
    category: "_wonder",
    wonder: !0,
    require: {
      science: "bronze_working",
      buildings: ["lo"],
    },
  },
  apadana: {
    id: "apadana",
    label: () => "Apadana",
    description: () => "<div>Improvement building speed +25%</div>",
    category: "_wonder",
    wonder: !0,
    require: {
      science: "masonry",
      buildings: ["town_hall"],
    },
  },
  ziggurat: {
    id: "ziggurat",
    label: () => "Great Ziggurat",
    description: () =>
      "<div>Slavers chances of success +100%</div><div>Free Temple in the city in which it was built</div>",
    add_city: "temple",
    category: "_wonder",
    wonder: !0,
    require: {
      science: "calendar",
      buildings: ["town_hall"],
    },
  },
  great_library: {
    id: "great_library",
    label: () => "Great Library",
    description: () =>
      '<div class="text-science"><i class="' +
      ug.science +
      '"></i> +5 / library</div><div>Free Library in the city in which it was built</div>',
    add_city: "library",
    category: "_wonder",
    wonder: !0,
    require: {
      science: "literature",
      buildings: ["town_hall"],
    },
  },
  mausoleum: {
    id: "mausoleum",
    label: () => "Mausoleum of Halicarnassus",
    description: () =>
      '<div>Reduce <i class="' +
      ug.spells +
      '"></i> spells cooldown by 15%</div><div class="text-culture"><i class="' +
      ug.culture +
      '"></i>+5</div>',
    desc: () =>
      '<span class="text-culture"><i class="' + ug.culture + '"></i> +5</span>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "religion",
      buildings: ["town_hall"],
    },
  },
  statue_zeus: {
    id: "statue_zeus",
    label: () => "Statue of Zeus",
    description: () =>
      "<div>+15% attack</div><div>+15% recruitment speed</div>",
    category: "_wonder",
    wonder: !0,
    require: {
      science: "archery",
      buildings: ["lo"],
    },
  },
  temple_artemis: {
    id: "temple_artemis",
    label: () => "Temple of Artemis",
    description: () =>
      '<div>+50% defense in the city in which it was built</div><div class="text-prod"><i class="' +
      ug.prod +
      '"></i>+1 / builder</div>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "archery",
      buildings: ["lo"],
    },
  },
  pantheon: {
    id: "pantheon",
    label: () => "Pantheon",
    description: () =>
      "Reduce discontent due to distance from capital by 50% (in all empire)",
    category: "_wonder",
    wonder: !0,
    require: {
      science: "construction",
      buildings: ["town_hall"],
    },
  },
  great_wall: {
    id: "great_wall",
    label: () => "Great Wall",
    description: () =>
      '<div><i class="' + ug.defense + '"></i> +50% (in all empire)</div>',
    desc: () => '<span><i class="' + ug.defense + '"></i> +50%</span>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "construction",
      buildings: ["town_hall"],
    },
  },
  forbidden: {
    id: "forbidden",
    label: () => "Forbidden City",
    description: () =>
      '<div><span class="text-influence"><i class="' +
      ug.influence +
      '"></i> +25%</span> to all civilizations</div><div class="text-culture"><i class="' +
      ug.culture +
      '"></i>+5</div>',
    desc: () =>
      '<span class="text-culture"><i class="' + ug.culture + '"></i> +5</span>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "printing",
      buildings: ["town_hall"],
    },
  },
  sistine: {
    id: "sistine",
    label: () => "Sistine Chapel",
    description: () =>
      '<div>Free Opera in each of your cities</div><div class="text-culture"><i class="' +
      ug.culture +
      '"></i>+15</div>',
    desc: () =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +15</span>',
    category: "_wonder",
    wonder: !0,
    add_all: "opera",
    require: {
      science: "acoustics",
      buildings: ["town_hall"],
    },
  },
  versailles: {
    id: "versailles",
    label: () => "Versailles",
    description: () =>
      '<div class="text-happiness"><i class="' +
      ug.happiness +
      '"></i>+10% to all cities</div><div class="text-culture"><i class="' +
      ug.culture +
      '"></i>+15</div>',
    desc: () =>
      '<span class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +10%</span> | <span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +15</span>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "acoustics",
      buildings: ["town_hall"],
    },
  },
  taj: {
    id: "taj",
    label: () => "Taj Mahal",
    description: () =>
      '<div>Reduce <i class="' +
      ug.spells +
      '"></i> spells cooldown by 15%</div><div class="text-culture"><i class="' +
      ug.culture +
      '"></i>+10</div>',
    desc: () =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +10</span>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "architecture",
      buildings: ["town_hall"],
    },
  },
  pisa: {
    id: "pisa",
    label: () => "Leaning Tower of Pisa",
    description: () =>
      '<div class="text-culture"><i class="' +
      ug.culture +
      '"></i> +10 / all trade routes</div>',
    desc: () =>
      '<span class="text-culture"><i class="' +
      ug.trade +
      '"></i> <i class="' +
      ug.culture +
      '"></i> +10</span>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "architecture",
      buildings: ["town_hall"],
    },
  },
  bigben: {
    id: "bigben",
    label: () => "Big Ben",
    description: () =>
      '<div class="text-gold"><i class="' +
      ug.gold +
      '"></i> +5% / colony</div><div class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +3% / colony</div>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "economics",
      buildings: ["town_hall"],
    },
  },
  casa: {
    id: "casa",
    label: () => "Casa Da India",
    description: () =>
      '<div>Caravel cost -50% & recruit time -50% in every city</div><div class="text-gold"><i class="' +
      ug.gold +
      '"></i> +2% / colony</div><div class="text-happiness"><i class="' +
      ug.happiness +
      '"></i> +2% / colony</div>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "astronomy",
      buildings: ["town_hall"],
    },
  },
  panama: {
    id: "panama",
    label: () => "Panama Canal",
    description: () =>
      '<div class="text-trade">+2 <i class="' +
      ug.trade +
      '"></i> trade routes</div>Remove <span class="text-trade"><i class="' +
      ug.trade +
      '"></i> trade routes</span> max dist.',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "steam",
      buildings: ["police"],
    },
    industrial: !0,
  },
  oxford: {
    id: "oxford",
    label: () => "Oxford University",
    description: () =>
      '<span class="text-science"><i class="' +
      ug.science +
      '"></i> +50%</span> in the city in which it was built',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "scientific",
      buildings: ["police"],
    },
    industrial: !0,
  },
  ruhr: {
    id: "ruhr",
    label: () => "Ruhr Valley",
    description: () =>
      '<span class="text-prod"><i class="' +
      ug.prod +
      '"></i> +25%</span> when producing <span class="text-prod">Progress</span>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "industrialization",
      buildings: ["police"],
    },
    industrial: !0,
  },
  eiffel: {
    id: "eiffel",
    label: () => "Eiffel Tower",
    description: () =>
      '<span class="text-progress"><i class="' +
      ug.progress +
      '"></i> +10 / min</span>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "railroad",
      buildings: ["police"],
    },
    industrial: !0,
  },
  brandenburg: {
    id: "brandenburg",
    label: () => "Brandenburg Gate",
    description: () =>
      "<div>+15% attack</div><div>+15% recruitment speed</div>",
    category: "_wonder",
    wonder: !0,
    require: {
      science: "military",
      buildings: ["police"],
    },
    industrial: !0,
  },
  hermitage: {
    id: "hermitage",
    label: () => "Hermitage",
    description: () =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i> +5</span> / <span class="text-relics"><i class="' +
      ug.relics +
      '"></i></span>',
    category: "_wonder",
    wonder: !0,
    require: {
      science: "archeology",
      buildings: ["police"],
    },
    industrial: !0,
  },
};