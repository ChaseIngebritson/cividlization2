// @ts-nocheck
// Reverse-engineered from webpack module zUnb
// Original variable: bg
// Deity powers / abilities
// Entries (~): 18
// Source range: 691678-705068
import { icons as ug } from './icons';

/** Reconstructed game data table (`powers`). Values may include runtime functions. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const powers: any = {
  abundance: {
    id: "abundance",
    name: "Abundance",
    icon: ug.food,
    description: (l) =>
      '<i class="text-food ' +
      ug.food +
      '"></i> production increased by <span class="text-primary">' +
      Math.round(100 * l.abundanceBonus()) +
      "%</span> for 5min (based on Feathered Serpent level)",
    help:
      '<i class="text-food ' +
      ug.food +
      '"></i> production increased for 5min (based on Feathered Serpent level)',
    time: 300,
    cooldown: 480,
    deity: "coatlicue",
    level: 1,
  },
  newfire: {
    id: "newfire",
    name: "New Fire",
    icon: ug.happiness,
    description: (l) =>
      '<i class="text-happiness ' +
      ug.happiness +
      '"></i> happiness increased (incremental)<br/>Current level: <span class="text-primary">' +
      Math.round(100 * l.newfireBonus()) +
      "%</span>",
    help:
      '<i class="text-happiness ' +
      ug.happiness +
      '"></i> happiness increased (incremental)',
    lock: "spell_newfire",
    lockDesc: (l) => "Total population " + l.pop() + " / 30",
    charging: !0,
    cooldown: 240,
    deity: "coatlicue",
    level: 2,
  },
  sacrifice: {
    id: "sacrifice",
    name: "Human Sacrifice",
    icon: ug.science,
    description: (l) =>
      '<span class="text-primary">+ ' +
      mg.format(Math.round(l.sacrificeBonus())) +
      '</span> <i class="text-science ' +
      ug.science +
      '"></i> (based on food production & global happiness)',
    help:
      '<i class="text-science ' +
      ug.science +
      '"></i> boost (based on food production & global happiness)',
    run: (l) => {
      let n = l.player();
      if (!n.science_queue.length) return !1;
      let e = l.sacrificeBonus();
      return (
        n.sciences[n.science_queue[0]].progress ||
          (n.sciences[n.science_queue[0]].progress = 0),
        (n.sciences[n.science_queue[0]].progress += e),
        n.sciences[n.science_queue[0]].progress >=
          l.scienceCost(l.conf.sciences[n.science_queue[0]]) &&
          (l.discoverScience(n.id),
          l.data.autopause.science && (l.data.pause = !0)),
        !0
      );
    },
    lock: "spell_sacrifice",
    lockDesc: (l) =>
      "New Fire charge " + (l.data.charging.newfire || 0) + " / 50",
    cooldown: 600,
    deity: "coatlicue",
    level: 3,
  },
  negociation: {
    id: "negociation",
    name: "Negociation",
    icon: ug.gold,
    description: (l) =>
      '<span class="text-trade"><i class="' +
      ug.trade +
      '"></i> Trade routes</span> produce <span class="text-primary">' +
      Math.round(100 * l.negociationBonus()) +
      '%</span> more <i class="text-gold ' +
      ug.gold +
      '"></i> for 5 min (based on Eye of Horus level)',
    help:
      '<span class="text-trade"><i class="' +
      ug.trade +
      '"></i> Trade routes</span> produce more <i class="text-gold ' +
      ug.gold +
      '"></i> for 5 min (based on Eye of Horus level)',
    time: 300,
    cooldown: 480,
    deity: "horus",
    level: 1,
  },
  tradenode: {
    id: "tradenode",
    name: "Trade node",
    icon: ug.trade,
    description: (l) =>
      '<span class="text-trade"><i class="' +
      ug.trade +
      '"></i> Trade routes</span> max number increased (incremental)<br/>Current level: <span class="text-primary">' +
      Math.floor(l.tradeNodeBonus()) +
      "</span> (not rounded: " +
      Math.floor(10 * l.tradeNodeBonus()) / 10 +
      ")",
    help:
      '<span class="text-trade"><i class="' +
      ug.trade +
      '"></i> Trade routes</span> max number increased (incremental)',
    lock: "spell_tradenode",
    lockDesc: (l) => "Total gold " + mg.format(l.goldTotal()) + " / 3M",
    charging: !0,
    cooldown: 300,
    deity: "horus",
    level: 2,
  },
  seshat: {
    id: "seshat",
    name: "Sechat's wisdom",
    icon: ug.science,
    description: (l) =>
      '<i class="text-gold ' +
      ug.gold +
      '"></i> value of <span class="text-trade"><i class="' +
      ug.trade +
      '"></i> Trade routes</span> is added to <i class="text-science ' +
      ug.science +
      '"></i> value of trade route for 2 min',
    help:
      '<i class="text-gold ' +
      ug.gold +
      '"></i> value of <span class="text-trade"><i class="' +
      ug.trade +
      '"></i> Trade routes</span> is added to <i class="text-science ' +
      ug.science +
      '"></i> value of trade route for 2 min',
    lock: "spell_seshat",
    lockDesc: (l) => "Trade routes " + l.tradeRouteNb() + " / 15",
    time: 120,
    cooldown: 480,
    deity: "horus",
    level: 3,
  },
  warpath: {
    id: "warpath",
    name: "War path",
    icon: ug.recruitment,
    description: (l) =>
      '<i class="' +
      ug.attack +
      '"></i> Recruitment speed increased and troop maintenance reduced(incremental)<br/>Current value:  <span class="text-primary">' +
      Math.floor(100 * l.warpathBonus()) +
      '%</span> (speed) | <span class="text-primary">-' +
      Math.floor(100 * l.warpathMaintenanceBonus()) +
      "%</span> (maintenance)",
    help:
      '<i class="' +
      ug.attack +
      '"></i> Recruitment speed increased (incremental)<br/>',
    charging: !0,
    cooldown: 300,
    deity: "odin",
    level: 1,
  },
  berserker: {
    id: "berserker",
    name: "Berserker",
    icon: ug.attack,
    description: (l) =>
      '<i class="' +
      ug.attack +
      '"></i> Attack increased by <span class="text-primary">' +
      Math.round(100 * l.berserkerAttackBonus()) +
      '%</span><br/><i class="' +
      ug.speed +
      '"></i> Speed increased by <span class="text-primary">' +
      Math.round(100 * l.berserkerSpeedBonus()) +
      '%</span><br/>Troop <i class="' +
      ug.capacity +
      '"></i> capacity x10<br/>for 2min (only for attacks, based on Valhalla level)',
    help:
      '<i class="' +
      ug.attack +
      '"></i> Attack increased and <i class="' +
      ug.speed +
      '"></i> Speed increased for 2min (only for attacks, based on Valhalla level)',
    lock: "spell_berserker",
    lockDesc: (l) => "Total troops " + mg.format(l.totalTroopNb()) + " / 500",
    time: 120,
    cooldown: 300,
    deity: "odin",
    level: 2,
  },
  appropriation: {
    id: "appropriation",
    name: "Appropriation",
    icon: ug.science,
    description: (l) =>
      '<span class="text-primary">+ ' +
      Math.round(l.appropriationBonus()) +
      '</span> <i class="text-science ' +
      ug.science +
      '"></i> and <i class="text-faith ' +
      ug.faith +
      '"></i> for each unit killed for 1 min (based on total army power)',
    help:
      '<i class="text-science ' +
      ug.science +
      '"></i> for each unit killed for 1 min (based on total army power)',
    lock: "spell_appropriation",
    lockDesc: (l) => "City burnt down " + l.data.burnNb + " / 5",
    time: 60,
    cooldown: 480,
    deity: "odin",
    level: 3,
  },
  timeshift: {
    id: "timeshift",
    name: "Timeshift",
    icon: ug.time,
    description: (l) =>
      'Advance in time for <span class="text-primary">+ ' +
      mg.formatTime(l.timeshiftBonus()) +
      "</span> (based on Third Eye level)",
    help: "Advance in time (based on Third Eye level)",
    run: (l, n) => (n.run(0, l.timeshiftBonus(), !0), !0),
    cooldown: 300,
    deity: "shiva",
    level: 1,
  },
  enlightment: {
    id: "enlightment",
    name: "Enlightment",
    icon: ug.science,
    description: (l) =>
      '<i class="text-science ' +
      ug.science +
      '"></i> production increased (incremental)<br/>Current value: <span class="text-primary">+' +
      Math.floor(100 * l.enlightmentBonus()) +
      "%</span>",
    help:
      '<i class="text-science ' +
      ug.science +
      '"></i> production increased (incremental)',
    lock: "spell_enlightment",
    lockDesc: (l) => "Capital population " + l.pop(l.capital()) + " / 8",
    charging: !0,
    cooldown: 300,
    deity: "shiva",
    level: 2,
  },
  maha: {
    id: "maha",
    name: "Maha Shivaratri",
    icon: ug.faith,
    description: (l) =>
      '<span class="text-primary">+ ' +
      mg.format(Math.round(l.mahaBonus())) +
      '</span> <i class="text-faith ' +
      ug.faith +
      '"></i> (based on science and global food production)',
    help:
      '<i class="text-faith ' +
      ug.faith +
      '"></i> boost (based on science and global food production)',
    run: (l) => ((l.player().faith += l.mahaBonus()), !0),
    lock: "spell_maha",
    lockDesc: (l) => "Nb of wonders " + l.wondersNb() + " / 10",
    cooldown: 600,
    deity: "shiva",
    level: 3,
  },
  idlers: {
    id: "idlers",
    name: "God of idlers",
    icon: ug.sleep,
    description: (l) =>
      'Idle citizens produce <i class="text-food ' +
      ug.food +
      '"></i>, <i class="text-culture ' +
      ug.culture +
      '"></i> and <i class="text-happiness ' +
      ug.happiness +
      '"></i> (incremental)<br/>Current value: <span class="text-primary">+' +
      mg.format(l.idlersBonus(), ".1") +
      " | +" +
      mg.format(l.idlersBonus() / 2, ".1") +
      " | +" +
      mg.format(l.idlersBonus()) +
      "%</span>",
    help:
      'Idle citizens produce <i class="text-food ' +
      ug.food +
      '"></i>, <i class="text-culture ' +
      ug.culture +
      '"></i> and <i class="text-happiness ' +
      ug.happiness +
      '"></i> (incremental)',
    charging: !0,
    cooldown: 300,
    deity: "dionysus",
    level: 1,
  },
  dionysia: {
    id: "dionysia",
    name: "Dionysia",
    icon: ug.culture,
    description: (l) =>
      '<i class="text-culture ' +
      ug.culture +
      '"></i> production increased by <span class="text-primary">' +
      Math.round(100 * l.dionysiaBonus()) +
      "%</span> for 2min (based on happiness and Orphic Mysteries level)",
    help:
      '<i class="text-culture ' +
      ug.culture +
      '"></i> production increased for 2min (based on happiness and Orphic Mysteries level)',
    time: 120,
    cooldown: 300,
    lock: "spell_dionysia",
    lockDesc: (l) => "Culture " + mg.format(l.player().culture) + " / 100k",
    deity: "dionysus",
    level: 2,
  },
  bacchanalia: {
    id: "bacchanalia",
    name: "Bacchanalia",
    icon: ug.faith,
    description: (l) =>
      '<i class="text-science ' +
      ug.science +
      '"></i> & <i class="text-faith ' +
      ug.faith +
      '"></i> production increased by <span class="text-primary">' +
      Math.round(100 * l.bacchanaliaBonus()) +
      "%</span> for 1min (based on happiness, culture production and nb of colonies)",
    help:
      '<i class="text-science ' +
      ug.science +
      '"></i> & <i class="text-faith ' +
      ug.faith +
      '"></i> production increased for 1min (based on happiness, culture production and nb of colonies)',
    time: 60,
    cooldown: 600,
    lock: "spell_bacchanalia",
    lockDesc: (l) => "Colonies " + l.colonyNb() + " / 15",
    deity: "dionysus",
    level: 3,
  },
  underworld: {
    id: "underworld",
    name: "Ruler of the Underworld",
    icon: ug.health,
    description: (l) =>
      'Reduce risks of losing citizens, troops and trade routes from disease & plague (incremental)<br/>Current value: <span class="text-primary">-' +
      mg.format(100 * l.underworldBonus(), ".1") +
      "%</span>",
    help: "Reduce risks of dying from disease (incremental)",
    charging: !0,
    cooldown: 300,
    deity: "batara",
    level: 1,
  },
  punisher: {
    id: "punisher",
    name: "The Punisher",
    icon: ug.faith,
    description: (l) =>
      '<i class="text-science ' +
      ug.science +
      '"></i> & <i class="text-faith ' +
      ug.faith +
      '"></i> production increased for each city suffering from the plague. Increase plague propagation risk. (incremental)<br/>Current value: <span class="text-primary">+' +
      mg.format(100 * l.punisherBonus(), ".1") +
      "% / city with plague</span>",
    help:
      '<i class="text-science ' +
      ug.science +
      '"></i> & <i class="text-faith ' +
      ug.faith +
      '"></i> production increased for each city suffering from the plague (incremental)',
    charging: !0,
    lock: "spell_punisher",
    lockDesc: (l) => "Survived a plague " + l.data.plagueNb + " / 1",
    cooldown: 420,
    deity: "batara",
    level: 2,
  },
  devourer: {
    id: "devourer",
    name: "Devourer of the Sun",
    icon: ug.plague,
    description: (l) =>
      'Start a <i class="' + ug.plague + '"></i> plague in a random location',
    help:
      'Start a <i class="' + ug.plague + '"></i> plague in a random location',
    run: (l) => {
      let n = yg.fromArray(l.allCities());
      return l.initPlague(n), !0;
    },
    lock: "spell_devourer",
    lockDesc: (l) => "Most spread plague " + l.data.plagueMaxCities + " / 20",
    cooldown: 600,
    deity: "batara",
    level: 3,
  },
};