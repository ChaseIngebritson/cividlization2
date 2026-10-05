// @ts-nocheck
// Reverse-engineered from webpack module zUnb
// Original variable: pg
// Military and civilian units
// Entries (~): 27
// Source range: 655271-673128
import { icons as ug } from './icons';

/** Reconstructed game data table (`units`). Values may include runtime functions. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const units: any = {
  warrior: {
    id: "warrior",
    name: (l) => ("aztecs" == l.civ_id ? "Eagle Warrior" : "Warrior"),
    description: "",
    gold: (l, n) => 20 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 20,
    attack: (l) => ("aztecs" == l.civ_id ? 6 : 2),
    ranged: () => !1,
    siege: !1,
    defense: () => 1,
    speed: () => 1,
    capacity: 20,
    require: {
      science: "tools",
      building: "barracks",
    },
    obsolete: "iron_working",
    upgradable: "swordsman",
    special: !1,
    conscript: !0,
  },
  swordsman: {
    id: "swordsman",
    name: (l) => ("romans" == l.civ_id ? "Legion" : "Swordsman"),
    description: "",
    gold: (l, n) =>
      200 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 100,
    attack: (l) => ("romans" == l.civ_id ? 25 : 15),
    ranged: () => !1,
    siege: !1,
    defense: (l) => ("romans" == l.civ_id ? 20 : 10),
    speed: () => 1,
    capacity: 40,
    require: {
      science: "iron_working",
      building: "barracks",
    },
    obsolete: "steel",
    upgradable: "longswordsman",
    special: !1,
    conscript: !0,
  },
  longswordsman: {
    id: "longswordsman",
    name: (l) =>
      "japanese" == l.civ_id
        ? "Samurai"
        : "vikings" == l.civ_id
          ? "Berserker"
          : "Longswordsman",
    description: "",
    gold: (l, n) =>
      2e3 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 500,
    attack: (l) =>
      "japanese" == l.civ_id ? 45 : "vikings" == l.civ_id ? 50 : 35,
    ranged: () => !1,
    siege: !1,
    defense: (l) => ("japanese" == l.civ_id ? 40 : 30),
    speed: (l) => ("vikings" == l.civ_id ? 2 : 1),
    capacity: 50,
    require: {
      science: "steel",
      building: "barracks",
    },
    obsolete: "rifling",
    special: !1,
    conscript: !0,
  },
  horseman: {
    id: "horseman",
    name: (l) => ("indians" == l.civ_id ? "War elephant" : "Horseman"),
    description: "",
    gold: (l, n) => 30 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 40,
    attack: () => 3,
    ranged: (l) => "indians" == l.civ_id,
    siege: !1,
    defense: () => 1,
    speed: () => 3,
    capacity: 80,
    require: {
      science: "horseriding",
      building: "stables",
    },
    obsolete: "chivalry",
    upgradable: "knight",
    special: !1,
    conscript: !0,
  },
  knight: {
    id: "knight",
    name: (l) => ("mongols" == l.civ_id ? "Keshik" : "Knight"),
    description: "",
    gold: (l, n) =>
      300 *
      (l && l.hasPolicy("holy_wars", n) ? 0.75 : 1) *
      (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 200,
    attack: () => 30,
    ranged: (l) => "mongols" == l.civ_id,
    siege: !1,
    defense: () => 10,
    speed: () => 2,
    capacity: 200,
    require: {
      science: "chivalry",
      building: "stables",
    },
    obsolete: "production",
    upgradable: "cavalry",
    special: !1,
    conscript: !0,
  },
  cavalry: {
    id: "cavalry",
    name: (l) =>
      "russians" == l.civ_id
        ? "Cossack"
        : "spanish" == l.civ_id
          ? "Conquistador"
          : "Cavalry",
    description: "",
    gold: (l, n) =>
      ("russians" == l.player(n).civ_id ? 2e3 : 3e3) *
      (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 600,
    attack: (l) => ("russians" == l.civ_id ? 80 : 60),
    ranged: (l) => "spanish" == l.civ_id,
    siege: !1,
    defense: () => 20,
    speed: () => 3,
    capacity: 400,
    require: {
      science: "military",
      building: "stables",
    },
    special: !1,
    conscript: !0,
  },
  archer: {
    id: "archer",
    name: () => "Archer",
    description: "Ranged units attack before all other troops",
    gold: (l, n) => 30 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 40,
    attack: () => 2,
    ranged: () => !0,
    siege: !1,
    defense: () => 2,
    speed: () => 1,
    capacity: 10,
    require: {
      science: "archery",
      building: "barracks",
    },
    obsolete: "optics",
    upgradable: "longbowman",
    special: !1,
    conscript: !0,
  },
  longbowman: {
    id: "longbowman",
    name: () => "Longbowman",
    description: "Ranged units attack before all other troops",
    gold: (l, n) =>
      300 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 200,
    attack: () => 10,
    ranged: () => !0,
    siege: !1,
    defense: () => 8,
    speed: () => 1,
    capacity: 20,
    require: {
      science: "optics",
      building: "barracks",
    },
    obsolete: "gunpowder",
    upgradable: "musketman",
    special: !1,
    conscript: !0,
  },
  musketman: {
    id: "musketman",
    name: (l) => ("americans" == l.civ_id ? "Minuteman" : "Musketman"),
    description: "",
    gold: (l, n) =>
      ("americans" == l.player(n).civ_id ? 2e3 : 3e3) *
      (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 600,
    attack: (l) => ("americans" == l.civ_id ? 40 : 30),
    ranged: () => !0,
    siege: !1,
    defense: () => 30,
    speed: () => 1,
    capacity: 30,
    require: {
      science: "gunpowder",
      building: "barracks",
    },
    special: !1,
    conscript: !0,
  },
  rifleman: {
    id: "rifleman",
    name: (l) => ("english" == l.civ_id ? "Red Coat" : "Rifleman"),
    description: "",
    gold: (l, n) =>
      2e4 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 1e3,
    attack: (l) => ("english" == l.civ_id ? 80 : 60),
    ranged: () => !0,
    siege: !1,
    defense: () => 50,
    speed: () => 1,
    capacity: 50,
    require: {
      science: "rifling",
      building: "barracks",
    },
    special: !1,
    conscript: !0,
  },
  lancier: {
    id: "lancier",
    name: (l) =>
      "greeks" == l.civ_id
        ? "Hoplite"
        : "persians" == l.civ_id
          ? "Immortal"
          : "Lancier",
    description: "Melee unit specialized in defense",
    gold: (l, n) =>
      ("persians" == l.player(n).civ_id ? 20 : 30) *
      (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 40,
    attack: (l) => ("greeks" == l.civ_id ? 7 : "persians" == l.civ_id ? 5 : 1),
    ranged: () => !1,
    siege: !1,
    defense: () => 4,
    speed: () => 1,
    capacity: 10,
    require: {
      science: "bronze_working",
      building: "barracks",
    },
    obsolete: "civil_service",
    upgradable: "pikeman",
    special: !1,
    conscript: !0,
  },
  pikeman: {
    id: "pikeman",
    name: (l) => ("zulus" == l.civ_id ? "Impi" : "Pikeman"),
    description: "",
    gold: (l, n) =>
      300 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 200,
    attack: (l) => ("zulus" == l.civ_id ? 21 : 1),
    ranged: () => !1,
    siege: !1,
    defense: () => 30,
    speed: () => 1,
    capacity: 20,
    require: {
      science: "civil_service",
      building: "barracks",
    },
    special: !1,
    conscript: !0,
  },
  catapult: {
    id: "catapult",
    name: (l) => ("assyrians" == l.civ_id ? "Siege Tower" : "Catapult"),
    description: "",
    gold: (l, n) => 60 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 80,
    attack: (l) => ("assyrians" == l.civ_id ? 8 : 4),
    ranged: () => !1,
    siege: !0,
    defense: () => 0,
    speed: () => 0.5,
    capacity: 0,
    require: {
      science: "mathematics",
      building: "sif",
    },
    obsolete: "physics",
    upgradable: "trebuchet",
    special: !1,
  },
  trebuchet: {
    id: "trebuchet",
    name: () => "Trebuchet",
    description: "",
    gold: (l, n) =>
      600 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 400,
    attack: () => 40,
    ranged: () => !1,
    siege: !0,
    defense: () => 0,
    speed: () => 0.5,
    capacity: 0,
    require: {
      science: "physics",
      building: "sif",
    },
    obsolete: "chemistry",
    upgradable: "cannon",
    special: !1,
  },
  cannon: {
    id: "cannon",
    name: () => "Cannon",
    description: "",
    gold: (l, n) =>
      6e3 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 800,
    attack: () => 60,
    ranged: () => !1,
    siege: !0,
    defense: () => 0,
    speed: () => 0.5,
    capacity: 0,
    require: {
      science: "chemistry",
      building: "sif",
    },
    special: !1,
  },
  artillery: {
    id: "artillery",
    name: () => "Artillery",
    description: "",
    gold: (l, n) =>
      15e3 * (l && l.hasPolicy("military_tradition", n) ? 0.75 : 1),
    time: () => 1200,
    attack: () => 90,
    ranged: () => !1,
    siege: !0,
    defense: () => 0,
    speed: () => 1,
    capacity: 0,
    require: {
      science: "dynamite",
      building: "sif",
    },
    special: !1,
  },
  governor: {
    id: "governor",
    name: () => "Governor",
    description: "Governors are used to capture enemy cities",
    gold: (l, n = 0) => (l ? l.govCost(n) : 0),
    time: () => 1e3,
    attack: () => 0,
    ranged: () => !1,
    siege: !1,
    defense: () => 0,
    speed: () => 1,
    capacity: 0,
    require: {
      science: "state",
      building: "town_hall",
    },
    special: !1,
    noautorecruit: !0,
  },
  scout: {
    id: "scout",
    name: () => "Scout",
    description: "Scouts are used to explore the world",
    gold: () => 40,
    time: () => 40,
    attack: () => 0,
    ranged: () => !1,
    siege: !1,
    defense: () => 0,
    speed: () => 1,
    capacity: 0,
    require: {
      science: "exploration",
      building: "lo",
    },
    obsolete: "education",
    upgradable: "explorer",
    special: !0,
  },
  explorer: {
    id: "explorer",
    name: () => "Explorer",
    description: "Explorer are like scouts, but faster and more resistant",
    gold: () => 1e3,
    time: () => 100,
    attack: () => 0,
    ranged: () => !1,
    siege: !1,
    defense: () => 0,
    speed: () => 2,
    capacity: 0,
    require: {
      science: "education",
      building: "town_hall",
    },
    special: !0,
  },
  worker: {
    id: "worker",
    name: () => "Worker",
    description:
      'Workers can build improvements. Each worker can build a limited amount of improvements. Cost <span class="text-pop"><i class="' +
      ug.pop +
      '"></i>1</span>',
    gold: () => 100,
    time: () => 50,
    citizen: 1,
    attack: () => 0,
    ranged: () => !1,
    siege: !1,
    defense: () => 0,
    speed: () => 1,
    capacity: 0,
    require: {
      science: "bronze_working",
      building: "lo",
    },
    special: !0,
    obsolete: "industrialization",
    upgradable: "engineer",
  },
  engineer: {
    id: "engineer",
    name: () => "Engineer",
    description:
      'Engineers can build advanced improvements. Cost <span class="text-pop"><i class="' +
      ug.pop +
      '"></i>1</span>',
    gold: () => 5e3,
    time: () => 600,
    citizen: 1,
    attack: () => 0,
    ranged: () => !1,
    siege: !1,
    defense: () => 0,
    speed: () => 2,
    capacity: 0,
    require: {
      science: "industrialization",
      building: "town_hall",
    },
    special: !0,
  },
  slaver: {
    id: "slaver",
    name: () => "Slaver",
    description:
      "Slaver can capture slave workers when they are part of a succesful attack.",
    gold: () => 500,
    time: () => 100,
    attack: () => 0,
    ranged: () => !1,
    siege: !1,
    defense: () => 0,
    speed: () => 1,
    capacity: 0,
    require: {
      science: "bronze_working",
      building: "lo",
    },
    special: !1,
  },
  archeologist: {
    id: "archeologist",
    name: () => "Archeologist",
    description:
      'Archeologists can retrieve <i class="' +
      ug.relics +
      ' text-relics"></i> relics from ruins',
    gold: () => 1e4,
    time: () => 900,
    attack: () => 0,
    ranged: () => !1,
    siege: !1,
    defense: () => 0,
    speed: () => 1,
    capacity: 0,
    require: {
      science: "archeology",
      building: "town_hall",
      tech: 100,
    },
    special: !0,
  },
  spy: {
    id: "spy",
    name: () => "Spy",
    description:
      "Spies are used to see the details of a city. They can also steal science. Use more spies for better chances of success",
    gold: () => 600,
    time: () => 100,
    attack: () => 0,
    ranged: () => !1,
    siege: !1,
    defense: () => 0,
    speed: () => 1,
    capacity: 0,
    require: {
      science: "monarchy",
      building: "town_hall",
    },
    special: !0,
  },
  caravan: {
    id: "caravan",
    name: () => "Caravan",
    description: "Caravans are used to create trade routes",
    gold: (l, n) => 400 * (l && l.hasPolicy("philantropy", n) ? 0.75 : 1),
    time: () => 300,
    attack: () => 0,
    ranged: () => !1,
    siege: !1,
    defense: () => 0,
    speed: () => 1,
    capacity: 0,
    require: {
      science: "navigation",
      building: "lo",
    },
    special: !0,
    noautorecruit: !0,
  },
  caravel: {
    id: "caravel",
    name: (l) => ("portuguese" == l.civ_id ? "Nau" : "Caravel"),
    description: "Caravels are used to create colonies",
    gold: (l, n) =>
      (0 == n ? 3e6 : 15e5) *
      ("portuguese" == l.player(n).civ_id ? 0.75 : 1) *
      (l && l.hasPolicy("philantropy", n) ? 0.75 : 1) *
      (l && l.hasPolicy("colonialism1", n) ? 0.5 : 1) *
      (l && l.hasWonder(n, "casa") ? 0.5 : 1),
    time: (l, n) =>
      1500 *
      (l && l.hasPolicy("colonialism1", n) ? 0.5 : 1) *
      (l && l.hasWonder(n, "casa") ? 0.5 : 1),
    attack: () => 0,
    ranged: () => !1,
    siege: !1,
    defense: () => 0,
    speed: () => 1,
    capacity: 0,
    require: {
      science: "astronomy",
      building: "seaport",
    },
    special: !0,
    noautorecruit: !0,
  },
  plague_doctor: {
    id: "plague_doctor",
    name: () => "Plague Doctor",
    description:
      "Plague Doctors are used to cure the plague and clear the city faster",
    gold: () => 500,
    time: () => 100,
    attack: () => 0,
    ranged: () => !1,
    siege: !1,
    defense: () => 0,
    speed: () => 1,
    capacity: 0,
    require: {
      science: "calendar",
      building: "lo",
    },
    special: !0,
    noautorecruit: !1,
  },
};