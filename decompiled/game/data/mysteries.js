// Reverse-engineered from webpack module zUnb
// Original variable: _g
// Deity mysteries / relic bonuses
// Entries (~): 12
// Source range: 705068-712147

const mysteries = {
  clairvoyance: {
    id: "clairvoyance",
    name: "Clairvoyance",
    description: (l) =>
      '<span class="text-science"><i class="' +
      ug.science +
      '"></i></span> production increased.<br/>' +
      (l
        ? (l.players[0].powers.clairvoyance
            ? 'Current: <span class="text-primary">+ ' +
              10 * l.players[0].powers.clairvoyance +
              " %</span><br/>"
            : "") +
          'Next level: <span class="text-primary">+ ' +
          10 * ((l.players[0].powers.clairvoyance || 0) + 1) +
          " %</span>"
        : ""),
    cost: {
      "": 1,
    },
  },
  stone: {
    id: "stone",
    name: "Stone Skin",
    description: (l) =>
      '<span class="text-defense"><i class="' +
      ug.defense +
      '"></i> Defense</span> increased.<br/>' +
      (l
        ? (l.players[0].powers.stone
            ? 'Current: <span class="text-primary">+ ' +
              5 * l.players[0].powers.stone +
              " %</span><br/>"
            : "") +
          'Next level: <span class="text-primary">+ ' +
          5 * ((l.players[0].powers.stone || 0) + 1) +
          " %</span>"
        : ""),
    cost: {
      "": 1,
    },
  },
  serpent: {
    id: "serpent",
    name: "Feathered Serpent",
    description: (l) =>
      'City <span class="text-food"><i class="' +
      ug.food +
      '"></i></span> production increased for each building owned.<br/>' +
      (l
        ? (l.players[0].powers.serpent
            ? 'Current: <span class="text-primary">+ ' +
              l.players[0].powers.serpent +
              " %</span> / building<br/>"
            : "") +
          'Next level: <span class="text-primary">+ ' +
          ((l.players[0].powers.serpent || 0) + 1) +
          " %</span> / building"
        : ""),
    cost: {
      coatlicue: 1,
    },
  },
  eye: {
    id: "eye",
    name: "Eye of Horus",
    description: (l) =>
      '<span class="text-trade"><i class="' +
      ug.trade +
      '"></i>Trade routes</span> increase <i class="text-happiness ' +
      ug.happiness +
      '"></i>.<br/>' +
      (l
        ? (l.players[0].powers.eye
            ? 'Current: <span class="text-primary">+ ' +
              mg.format(0.5 * l.players[0].powers.eye, ".2") +
              "</span> / trade route<br/>"
            : "") +
          'Next level: <span class="text-primary">+ ' +
          mg.format(0.5 * ((l.players[0].powers.eye || 0) + 1), ".2") +
          "</span>  / trade route"
        : ""),
    cost: {
      horus: 1,
    },
  },
  valhalla: {
    id: "valhalla",
    name: "Valhalla",
    description: (l) =>
      "Happiness increased from garrisoned units.<br/>" +
      (l
        ? (l.players[0].powers.valhalla
            ? 'Current: <span class="text-primary">+ ' +
              mg.format(0.025 * l.players[0].powers.valhalla, ".2") +
              " %</span> / unit<br/>"
            : "") +
          'Next level: <span class="text-primary">+ ' +
          mg.format(0.025 * ((l.players[0].powers.valhalla || 0) + 1), ".2") +
          " %</span> / unit"
        : ""),
    cost: {
      odin: 1,
    },
  },
  thirdeye: {
    id: "thirdeye",
    name: "Third Eye",
    description: (l) =>
      '<span class="text-food"><i class="' +
      ug.food +
      '"></i></span> and <span class="text-prod"><i class="' +
      ug.prod +
      '"></i></span> production increased in the capital.<br/>' +
      (l
        ? (l.players[0].powers.thirdeye
            ? 'Current: <span class="text-primary">+ ' +
              10 * l.players[0].powers.thirdeye +
              " %</span><br/>"
            : "") +
          'Next level: <span class="text-primary">+ ' +
          10 * ((l.players[0].powers.thirdeye || 0) + 1) +
          " %</span>"
        : ""),
    cost: {
      shiva: 1,
    },
  },
  sequencer: {
    id: "sequencer",
    name: "Sequencer",
    description: (l, n) =>
      'Incremental <span class="text-spells"><i class="' +
      ug.spells +
      '"></i> spells</span> cooldown reduced.<br/>' +
      (n
        ? (l.players[0].powers.sequencer
            ? 'Current: <span class="text-primary">- ' +
              mg.format(100 * n.sequencerBonus(0), ".1") +
              " %</span><br/>"
            : "") +
          'Next level: <span class="text-primary">- ' +
          mg.format(100 * n.sequencerBonus(0, 1), ".1") +
          " %</span>"
        : ""),
    cost: {
      "": 1,
      batara: 1,
    },
  },
  orphic: {
    id: "orphic",
    name: "Orphic Mysteries",
    description: (l) =>
      'All citizens produce <span class="text-faith"><i class="' +
      ug.faith +
      '"></i></span>.<br/>' +
      (l
        ? (l.players[0].powers.orphic
            ? 'Current: <span class="text-primary">+ ' +
              mg.format(0.2 * l.players[0].powers.orphic, ".1") +
              " / citizen</span><br/>"
            : "") +
          'Next level: <span class="text-primary">+ ' +
          mg.format(0.2 * ((l.players[0].powers.orphic || 0) + 1), ".1") +
          " / citizen</span>"
        : ""),
    cost: {
      "": 1,
      dionysus: 1,
    },
  },
  haste: {
    id: "haste",
    name: "Haste",
    description: (l) =>
      'Increase troop <i class="' +
      ug.speed +
      '"></i> speed.<br/>' +
      (l
        ? (l.players[0].powers.haste
            ? 'Current: <span class="text-primary">+ ' +
              5 * l.players[0].powers.haste +
              " %<br/>"
            : "") +
          'Next level: <span class="text-primary">+ ' +
          5 * ((l.players[0].powers.haste || 0) + 1) +
          " %</span>"
        : ""),
    cost: {
      odin: 1,
      batara: 1,
    },
  },
  eternity: {
    id: "eternity",
    name: "Gateway to Eternity",
    description: (l) =>
      '<span class="text-prod"><i class="' +
      ug.prod +
      '"></i></span> production increased for each <span class="text-trade"><i class="' +
      ug.trade +
      '"></i>Trade routes</span>.<br/>' +
      (l
        ? (l.players[0].powers.eternity
            ? 'Current: <span class="text-primary">+ ' +
              5 * l.players[0].powers.eternity +
              " %</span> / trade route<br/>"
            : "") +
          'Next level: <span class="text-primary">+ ' +
          5 * ((l.players[0].powers.eternity || 0) + 1) +
          " %</span> / trade route"
        : ""),
    cost: {
      coatlicue: 1,
      horus: 1,
    },
  },
  ouroboros: {
    id: "ouroboros",
    name: "Ouroboros",
    description: (l) =>
      '<span class="text-culture"><i class="' +
      ug.culture +
      '"></i></span> production increased for each tech discovered.<br/>' +
      (l
        ? (l.players[0].powers.ouroboros
            ? 'Current: <span class="text-primary">+ ' +
              2 * l.players[0].powers.ouroboros +
              " %</span> / tech discovered<br/>"
            : "") +
          'Next level: <span class="text-primary">+ ' +
          2 * ((l.players[0].powers.ouroboros || 0) + 1) +
          " %</span> / tech discovered"
        : ""),
    cost: {
      dionysus: 1,
      shiva: 1,
    },
  },
  bliss: {
    id: "bliss",
    name: "Bliss",
    description: (l) =>
      '<span class="text-happiness"><i class="' +
      ug.happiness +
      '"></i></span> increased.<br/>' +
      (l
        ? (l.players[0].powers.bliss
            ? 'Current: <span class="text-primary">+ ' +
              5 * l.players[0].powers.bliss +
              " %</span><br/>"
            : "") +
          'Next level: <span class="text-primary">+ ' +
          5 * ((l.players[0].powers.bliss || 0) + 1) +
          " %</span>"
        : ""),
    cost: {
      "": 1,
      odin: 1,
      shiva: 1,
      coatlicue: 1,
      horus: 1,
      dionysus: 1,
      batara: 1,
    },
  },
};

export default mysteries;
