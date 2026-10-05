// @ts-nocheck
// Reverse-engineered from webpack module zUnb
// Original variable: hg
// Culture policy groups and policies
// Entries (~): 2
// Source range: 630186-655271
import { icons as ug } from './icons';

/** Reconstructed game data table (`policies`). Values may include runtime functions. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const policies: any = {
  groups: {
    traditionalism: {
      id: "traditionalism",
      name: "Traditionalism",
      description:
        '<span class="text-culture"><i class="' +
        ug.culture +
        '"></i> +15%</span> in the Capital<br/><i class="' +
        ug.forbidden +
        '"></i><b>Exclude <span class="text-culture">Imperialism</span><b>',
      require: "art",
      lockedBy: "imperialism",
    },
    imperialism: {
      id: "imperialism",
      name: "Imperialism",
      description:
        '<span class="text-culture"><i class="' +
        ug.culture +
        '"></i> +5% </span>/ city<br/><i class="' +
        ug.forbidden +
        '"></i><b>Exclude <span class="text-culture">Traditionalism</span><b>',
      require: "art",
      lockedBy: "traditionalism",
    },
    piety: {
      id: "piety",
      name: "Piety",
      description:
        '<span class="text-faith"><i class="' +
        ug.faith +
        '"></i> +2 </span>/ shrine<br/><i class="' +
        ug.forbidden +
        '"></i><b>Exclude <span class="text-culture">Rationalism</span><b>',
      require: "herding",
      lockedBy: "rationalism",
    },
    rationalism: {
      id: "rationalism",
      name: "Rationalism",
      description:
        '<span class="text-science"><i class="' +
        ug.science +
        '"></i> +1 </span>/ scientist<br/><i class="' +
        ug.forbidden +
        '"></i><b>Exclude <span class="text-culture">Piety</span><b>',
      require: "writing",
      lockedBy: "piety",
    },
    pacifism: {
      id: "pacifism",
      name: "Pacifism",
      description:
        '<span class="text-trade"><i class="' +
        ug.trade +
        '"></i> +2 </span> trade routes<br/><i class="' +
        ug.forbidden +
        '"></i><b>Exclude <span class="text-culture">Militarism</span><b>',
      require: "navigation",
      lockedBy: "militarism",
    },
    militarism: {
      id: "militarism",
      name: "Militarism",
      description:
        'Military buildings cost <span class="text-gold"><i class="' +
        ug.gold +
        '"></i> -25%</span> <span class="text-prod"><i class="' +
        ug.prod +
        '"></i> -25%</span><br/><i class="' +
        ug.forbidden +
        '"></i><b>Exclude <span class="text-culture">Pacifism</span><b>',
      require: "state",
      lockedBy: "pacifism",
    },
  },
  policies: {
    wisdom_ancients: {
      id: "wisdom_ancients",
      name: "Wisdom of the Ancients",
      description:
        '<span class="text-science"><i class="' +
        ug.science +
        '"></i> +25%</span> in the Capital',
      require: {
        science: "herding",
        policy: "",
      },
      groups: ["traditionalism"],
    },
    aristocracy: {
      id: "aristocracy",
      name: "Aristocracy",
      description:
        '<span class="text-gold"><i class="' +
        ug.gold +
        '"></i> +25%</span> in the Capital',
      require: {
        science: "armies",
        policy: "wisdom_ancients",
      },
      groups: ["traditionalism"],
    },
    city_state: {
      id: "city_state",
      name: "City-state",
      description: '<i class="' + ug.defense + '"></i> +20% in the Capital',
      require: {
        science: "calendar",
        policy: "aristocracy",
      },
      groups: ["traditionalism"],
    },
    oligarchy: {
      id: "oligarchy",
      name: "Oligarchy",
      description: "Reduce troop maintenance in the Capital by half",
      require: {
        science: "literature",
        policy: "city_state",
      },
      groups: ["traditionalism"],
    },
    landed_elite: {
      id: "landed_elite",
      name: "Landed Elite",
      description:
        '<span class="text-faith"><i class="' +
        ug.faith +
        '"></i> +50%</span> in the Capital',
      require: {
        science: "monarchy",
        policy: "oligarchy",
      },
      groups: ["traditionalism"],
    },
    conservatism: {
      id: "conservatism",
      name: "Conservatism",
      description:
        '<span class="text-influence"><i class="' +
        ug.influence +
        '"></i> -25%</span> form other civilizations',
      require: {
        science: "milling",
        policy: "landed_elite",
      },
      groups: ["traditionalism"],
    },
    isolationism: {
      id: "isolationism",
      name: "Isolationism",
      description:
        '<span class="text-health"><i class="' +
        ug.health +
        '"></i> +15%</span> in the Capital',
      require: {
        science: "civil_service",
        policy: "conservatism",
      },
      groups: ["traditionalism"],
    },
    collective_rules: {
      id: "collective_rules",
      name: "Collective Rules",
      description:
        'Governor cost <span class="text-gold"><i class="' +
        ug.gold +
        '"></i> -25%</span>',
      require: {
        science: "state",
        policy: "",
      },
      groups: ["imperialism"],
    },
    meritocracy: {
      id: "meritocracy",
      name: "Meritocracy",
      description:
        '<span class="text-gold"><i class="' +
        ug.gold +
        '"></i> +5%</span> in every city',
      require: {
        science: "armies",
        policy: "collective_rules",
      },
      groups: ["imperialism"],
    },
    administration: {
      id: "administration",
      name: "Administration",
      description:
        '<span class="text-prod"><i class="' +
        ug.prod +
        '"></i> +5%</span> in every city',
      require: {
        science: "code_of_laws",
        policy: "meritocracy",
      },
      groups: ["imperialism"],
    },
    patriotism: {
      id: "patriotism",
      name: "Patriotism",
      description:
        '<span class="text-happiness"><i class="' +
        ug.happiness +
        '"></i> +5%</span> in every city',
      require: {
        science: "diplomacy",
        policy: "administration",
      },
      groups: ["imperialism"],
    },
    colonialism: {
      id: "colonialism",
      name: "State Religion",
      description:
        '<span class="text-faith"><i class="' +
        ug.faith +
        '"></i> +15%</span> in every city',
      require: {
        science: "republic",
        policy: "patriotism",
      },
      groups: ["imperialism"],
    },
    colonialism1: {
      id: "colonialism1",
      name: "Colonialism",
      description: "Caravel cost -50% & recruit time -50%",
      require: {
        science: "astronomy",
        policy: "colonialism",
      },
      groups: ["imperialism"],
    },
    geographical: {
      id: "geographical",
      name: "Geographical Society",
      description:
        '+ 2% <i class="text-science ' +
        ug.science +
        '"></i> / <span class="text-colony"><i class="' +
        ug.colony +
        '"></i> Colony</span>',
      require: {
        science: "economics",
        policy: "colonialism1",
      },
      groups: ["imperialism"],
    },
    religious_laws: {
      id: "religious_laws",
      name: "Religious Laws",
      description:
        '<span class="text-faith"><i class="' +
        ug.faith +
        '"></i> +2</span> / trade route',
      require: {
        science: "code_of_laws",
        policy: "",
      },
      groups: ["piety"],
    },
    organized_religion: {
      id: "organized_religion",
      name: "Organized Religion",
      description:
        '<span class="text-health"><i class="' +
        ug.health +
        '"></i> +5%</span> / Temple',
      require: {
        science: "religion",
        policy: "religious_laws",
      },
      groups: ["piety"],
    },
    theocracy: {
      id: "theocracy",
      name: "Theocracy",
      description:
        '<span class="text-happiness"><i class="' +
        ug.happiness +
        '"></i> +5%</span> / Monastery',
      require: {
        science: "theology",
        policy: "organized_religion",
      },
      groups: ["piety"],
    },
    holy_wars: {
      id: "holy_wars",
      name: "Holy Wars",
      description:
        'Knights cost <span class="text-gold"><i class="' +
        ug.gold +
        '"></i> -25%</span>',
      require: {
        science: "chivalry",
        policy: "theocracy",
      },
      groups: ["piety"],
    },
    reformation: {
      id: "reformation",
      name: "Reformation",
      description:
        '<span class="text-science"><i class="' +
        ug.science +
        '"></i> +10%</span> <span class="text-faith"><i class="' +
        ug.faith +
        '"></i> +10%</span> / Monastery',
      require: {
        science: "education",
        policy: "holy_wars",
      },
      groups: ["piety"],
    },
    holy_place: {
      id: "holy_place",
      name: "Holy Place",
      description:
        '<span class="text-influence"><i class="' +
        ug.influence +
        '"></i> +25%</span> towards civilization with same religion',
      require: {
        science: "printing",
        policy: "reformation",
      },
      groups: ["piety"],
    },
    red_cross: {
      id: "red_cross",
      name: "Red Cross",
      description:
        "Reduce risks of loosing citizens, troops and trade routes from disease & plague by 50%",
      require: {
        science: "chemistry",
        policy: "holy_place",
      },
      groups: ["piety"],
    },
    code_of_laws: {
      id: "code_of_laws",
      name: "Code of Laws",
      description:
        '<span class="text-science"><i class="' +
        ug.science +
        '"></i> +0.1</span> / citizen',
      require: {
        science: "code_of_laws",
        policy: "",
      },
      groups: ["rationalism"],
    },
    philosophy: {
      id: "philosophy",
      name: "Philosophy",
      description:
        '<span class="text-culture"><i class="' +
        ug.culture +
        '"></i> +5%</span> / library',
      require: {
        science: "literature",
        policy: "code_of_laws",
      },
      groups: ["rationalism"],
    },
    secularism: {
      id: "secularism",
      name: "Secularism",
      description:
        '<span class="text-happiness"><i class="' +
        ug.happiness +
        '"></i> +5%</span> / shrine',
      require: {
        science: "theology",
        policy: "philosophy",
      },
      groups: ["rationalism"],
    },
    sovereignty: {
      id: "sovereignty",
      name: "Sovereignty",
      description:
        '<span class="text-science"><i class="' +
        ug.science +
        '"></i> +2</span> / trade route',
      require: {
        science: "feudalism",
        policy: "secularism",
      },
      groups: ["rationalism"],
    },
    scientific_state: {
      id: "scientific_state",
      name: "Scientific State",
      description:
        '<span class="text-science"><i class="' +
        ug.science +
        '"></i> +10%</span> <span class="text-faith"><i class="' +
        ug.faith +
        '"></i> +10%</span> / University',
      require: {
        science: "education",
        policy: "sovereignty",
      },
      groups: ["rationalism"],
    },
    cultural_promotion: {
      id: "cultural_promotion",
      name: "Cultural Promotion",
      description:
        '<span class="text-influence"><i class="' +
        ug.influence +
        '"></i> +10%</span> / trade route',
      require: {
        science: "printing",
        policy: "scientific_state",
      },
      groups: ["rationalism"],
    },
    procedures: {
      id: "procedures",
      name: "Medical Procedures",
      description:
        '<span class="text-health"><i class="' +
        ug.health +
        '"></i> +5%</span> / hospital',
      require: {
        science: "fertilizer",
        policy: "cultural_promotion",
      },
      groups: ["rationalism"],
    },
    patronage: {
      id: "patronage",
      name: "Patronage",
      description:
        'Starting relation <span class="text-diplomacy"><i class="' +
        ug.diplomacy +
        '"></i> +10</span>',
      require: {
        science: "diplomacy",
        policy: "",
      },
      groups: ["pacifism"],
    },
    philantropy: {
      id: "philantropy",
      name: "Philantropy",
      description:
        '<span class="text-diplomacy"><i class="' +
        ug.diplomacy +
        '"></i> +1</span> / trade route<br/>Caravans & Caravels cost <span class="text-gold"><i class="' +
        ug.gold +
        '"></i> -25%</span>',
      require: {
        science: "drama",
        policy: "patronage",
      },
      groups: ["pacifism"],
    },
    cultural_diplomacy: {
      id: "cultural_diplomacy",
      name: "Cultural Diplomacy",
      description:
        '<span class="text-culture"><i class="' +
        ug.culture +
        '"></i> +15%</span> / trade route',
      require: {
        science: "republic",
        policy: "philantropy",
      },
      groups: ["pacifism"],
    },
    merchant_confederacy: {
      id: "merchant_confederacy",
      name: "Merchant Confederacy",
      description:
        '<span class="text-gold"><i class="' +
        ug.gold +
        '"></i> +15%</span> / trade route',
      require: {
        science: "currency",
        policy: "cultural_diplomacy",
      },
      groups: ["pacifism"],
    },
    scholasticism: {
      id: "scholasticism",
      name: "Scholasticism",
      description:
        '<span class="text-faith"><i class="' +
        ug.faith +
        '"></i> +5</span> / trade route<br/><span class="text-trade"><i class="' +
        ug.trade +
        '"></i> +2 </span> trade routes',
      require: {
        science: "education",
        policy: "merchant_confederacy",
      },
      groups: ["pacifism"],
    },
    collaboration: {
      id: "collaboration",
      name: "Collaboration",
      description:
        '<span class="text-influence"><i class="' +
        ug.influence +
        '"></i> +5%</span> towards civilization at peace<br/><span class="text-influence"><i class="' +
        ug.influence +
        '"></i> +10%</span> towards allied civilization<br/>',
      require: {
        science: "economics",
        policy: "scholasticism",
      },
      groups: ["pacifism"],
    },
    monopoly: {
      id: "monopoly",
      name: "Monopoly",
      description:
        '<span class="text-food"><i class="' +
        ug.food +
        '"></i> +10%</span> and <span class="text-happiness"><i class="' +
        ug.happiness +
        '"></i> +5%</span> in cities with trade routes.',
      require: {
        science: "production",
        policy: "collaboration",
      },
      groups: ["pacifism"],
    },
    code_of_honor: {
      id: "code_of_honor",
      name: "Code of Honor",
      description:
        '<i class="' +
        ug.attack +
        '"></i> +15% attack & defense against barbarians',
      require: {
        science: "armies",
        policy: "",
      },
      groups: ["militarism"],
    },
    despotism: {
      id: "despotism",
      name: "Despotism",
      description:
        '<span class="text-happiness"><i class="' +
        ug.happiness +
        '"></i> +5%</span> / barracks',
      require: {
        science: "code_of_laws",
        policy: "code_of_honor",
      },
      groups: ["militarism"],
    },
    discipline: {
      id: "discipline",
      name: "Discipline",
      description:
        '<i class="' +
        ug.siege +
        '"></i> +25% chance to break walls & castle with siege units',
      require: {
        science: "tactics",
        policy: "despotism",
      },
      groups: ["militarism"],
    },
    military_tradition: {
      id: "military_tradition",
      name: "Military Tradition",
      description:
        'Military units cost <span class="text-gold"><i class="' +
        ug.gold +
        '"></i> -25%</span>',
      require: {
        science: "feudalism",
        policy: "discipline",
      },
      groups: ["militarism"],
    },
    professional_army: {
      id: "professional_army",
      name: "Professional Army",
      description: "Reduce troop maintenance by half",
      require: {
        science: "chivalry",
        policy: "military_tradition",
      },
      groups: ["militarism"],
    },
    colonial_conquest: {
      id: "colonial_conquest",
      name: "Colonial Conquest",
      description:
        '<span class="text-gold"><i class="' +
        ug.gold +
        '"></i> +5% / colony</span> ',
      require: {
        science: "astronomy",
        policy: "professional_army",
      },
      groups: ["militarism"],
    },
    conscription: {
      id: "conscription",
      name: "Conscription",
      description: "Chances to receive troops from your colonies",
      require: {
        science: "rigging",
        policy: "colonial_conquest",
      },
      groups: ["militarism"],
    },
    wonder_builder: {
      id: "wonder_builder",
      name: "Wonder builder",
      description:
        'Worker can be converted into <span class="text-prod"><i class="' +
        ug.prod +
        '"></i> 600 (increase with scientific adv.)</span>',
      require: {
        science: "horseriding",
        policy: "",
      },
      groups: ["traditionalism", "piety"],
    },
    who: {
      id: "who",
      name: "World Health Organization",
      description:
        '<span class="text-health"><i class="' +
        ug.health +
        '"></i> +8%</span> / <span class="text-pop">Scientist</span>',
      require: {
        science: "sanitation",
        policy: "",
      },
      groups: ["traditionalism", "rationalism"],
    },
    academy: {
      id: "academy",
      name: "Platonic Academy",
      description:
        '+1 <span class="text-trade"><i class="' +
        ug.trade +
        '"></i></span><br/><span class="text-science"><i class="' +
        ug.science +
        '"></i> +5</span> / <span class="text-trade"><i class="' +
        ug.trade +
        '"></i></span>',
      require: {
        science: "writing",
        policy: "",
      },
      groups: ["traditionalism", "pacifism"],
    },
    slavery: {
      id: "slavery",
      name: "Organized Slavery",
      description:
        "50% chances to get a 2nd worker when slaver attack is succesful (only if enemy city has enough population)",
      require: {
        science: "code_of_laws",
        policy: "",
      },
      groups: ["traditionalism", "militarism"],
    },
    proselytism: {
      id: "proselytism",
      name: "Proselytism",
      description:
        '<span class="text-faith"><i class="' +
        ug.faith +
        '"></i> +1%</span> / nb of cities',
      require: {
        science: "music_theory",
        policy: "",
      },
      groups: ["imperialism", "piety"],
    },
    nih: {
      id: "nih",
      name: "National Institute of Health",
      description:
        '<span class="text-health"><i class="' +
        ug.health +
        '"></i> +5%</span> (globally)',
      require: {
        science: "biology",
        policy: "",
      },
      groups: ["imperialism", "rationalism"],
    },
    congress: {
      id: "congress",
      name: "World Congress",
      description:
        '<span class="text-influence"><i class="' +
        ug.influence +
        '"></i> +25%</span>',
      require: {
        science: "scientific",
        policy: "",
      },
      groups: ["imperialism", "pacifism"],
    },
    police_state: {
      id: "police_state",
      name: "Police State",
      description:
        '<span class="text-happiness"><i class="' +
        ug.happiness +
        '"></i> +10%</span> / Courthouse',
      require: {
        science: "gunpowder",
        policy: "",
      },
      groups: ["imperialism", "militarism"],
    },
    miracles: {
      id: "miracles",
      name: "Square of Miracles",
      description:
        '<span class="text-magic"><i class="' +
        ug.spells +
        '"></i>Spells</span> cooldown reduced by 20%',
      require: {
        science: "advanced_fortification",
        policy: "",
      },
      groups: ["piety", "pacifism"],
    },
    crusades: {
      id: "crusades",
      name: "Crusades",
      description:
        '<span class="text-faith"><i class="' +
        ug.faith +
        '"></i></span> +10 / enemy killed (attacking only)',
      require: {
        science: "theology",
        policy: "",
      },
      groups: ["piety", "militarism"],
    },
    liberalism: {
      id: "liberalism",
      name: "Liberalism",
      description:
        '<span class="text-prod"><i class="' +
        ug.prod +
        '"></i> +25%</span> when building <span class="text-prod">Progress</span>',
      require: {
        science: "corporation",
        policy: "",
      },
      groups: ["rationalism", "pacifism"],
    },
    civilizing: {
      id: "civilizing",
      name: "Civilizing Mission",
      description:
        '<span class="text-progress"><i class="' +
        ug.progress +
        '"></i> +50</span> on city conquest',
      require: {
        science: "dynamite",
        policy: "",
      },
      groups: ["rationalism", "militarism"],
    },
  },
};