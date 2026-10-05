// Reverse-engineered from webpack module zUnb
// Original variable: Ig
// Tile improvements (farms, mines, etc.)
// Entries (~): 8
// Source range: 751161-754201

const improvements = {
  1: {
    id: 1,
    name: "Farm",
    description:
      '<span class="text-food"><i class="' +
      ug.food +
      '"></i> +1</span> / farmer',
    description2: "Can only be built on Grasslands & Plains (no hills)",
    terrains: [1, 3],
    require: "crop_rotation",
    time: 60,
    cost: 200,
    level: 1,
  },
  2: {
    id: 2,
    name: "Mechanized Farm",
    description:
      '<span class="text-food"><i class="' +
      ug.food +
      '"></i> +2</span> / farmer',
    description2: "Can only be built on Grasslands & Plains (no hills)",
    terrains: [1, 3],
    require: "sanitation",
    time: 300,
    cost: 2e5,
    level: 2,
  },
  3: {
    id: 3,
    name: "Mine",
    description:
      '<span class="text-prod"><i class="' +
      ug.prod +
      '"></i> +1</span> / builder',
    description2: "Can only be built on Hills",
    terrains: [2, 4],
    require: "bronze_working",
    time: 90,
    cost: 300,
    level: 1,
  },
  4: {
    id: 4,
    name: "Industrial Park",
    description:
      '<span class="text-prod"><i class="' +
      ug.prod +
      '"></i> +2</span> / builder',
    description2: "Can only be built on Hills",
    terrains: [2, 4],
    require: "electricity",
    time: 600,
    cost: 3e5,
    level: 2,
  },
  5: {
    id: 5,
    name: "Road",
    description:
      "Increase movements speed & trade route value when 2 cities are connected.<br/>Increase gold if city is connected to the capital.",
    terrains: [],
    require: "wheel",
    time: 60,
    cost: 50,
    road: !0,
    level: 1,
  },
  6: {
    id: 6,
    name: "Railroad",
    description:
      "Increase movements speed & trade route value when 2 cities are connected.<br/>Increase production if city is connected to the capital.",
    terrains: [],
    require: "railroad",
    time: 180,
    cost: 1e5,
    road: !0,
    level: 2,
  },
  7: {
    id: 7,
    name: "Trading Post",
    description:
      '<span class="text-gold"><i class="' +
      ug.gold +
      '"></i> +1</span> / merchant',
    description2: "Cannot be built on desert",
    terrains: [1, 2, 3, 4, 5],
    require: "mathematics",
    time: 150,
    cost: 1e4,
    level: 1,
  },
  8: {
    id: 8,
    name: "Forest Camp",
    description:
      '<span class="text-science"><i class="' +
      ug.science +
      '"></i> +1</span> / scholar',
    description2: "Can only be built on Forests",
    terrains: [5],
    require: "iron_working",
    time: 180,
    cost: 2e4,
    level: 1,
  },
};

export default improvements;
