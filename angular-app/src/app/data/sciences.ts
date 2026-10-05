// @ts-nocheck
// Reverse-engineered from webpack module zUnb
// Original variable: dg
// Science / technology tree
// Entries (~): 73
// Source range: 603658-630186
import { icons as ug } from './icons';

/** Reconstructed game data table (`sciences`). Values may include runtime functions. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sciences: any = {
  language: {
    id: "language",
    label: "Language",
    description:
      '<span class="text-science">+0.1 <i class="' +
      ug.science +
      '"></i> / citizen</span>',
    require: [],
    rank: 1,
  },
  dog_domestication: {
    id: "dog_domestication",
    label: "Dog domestication",
    description:
      '<span class="text-food">+0.5 <i class="' +
      ug.food +
      '"></i> / hunter-gatherer</span>',
    require: [],
    rank: 1,
  },
  tanning: {
    id: "tanning",
    label: "Tanning",
    description:
      'Unlock <span class="text-pop">Builders</span><br/>Unlock <span class="text-prod">Longhouse</span>',
    require: [],
    rank: 1,
  },
  pottery: {
    id: "pottery",
    label: "Pottery",
    description:
      '<span class="text-health">+5% <i class="' + ug.health + '"></i></span>',
    require: [],
    rank: 1,
  },
  trade: {
    id: "trade",
    label: "Trade",
    description: 'Unlock <span class="text-pop">Merchants</span>',
    require: ["language", "dog_domestication"],
    rank: 2,
  },
  spirituality: {
    id: "spirituality",
    label: "Spirituality",
    description:
      'Unlock <span class="text-prod">Shrine</span><br/>Unlock <span class="text-special">Daily Bonus</span>',
    require: ["language", "tanning"],
    rank: 2,
  },
  mining: {
    id: "mining",
    label: "Mining",
    description: 'Unlock <span class="text-prod">Chest</span>',
    require: ["pottery", "tanning"],
    rank: 2,
  },
  tools: {
    id: "tools",
    label: "Tools",
    description:
      'Unlock <span class="text-prod">Barracks</span><br/>Unlock <span class="text-troop">Warrior</span><br/>',
    require: ["pottery", "tanning"],
    rank: 2,
  },
  art: {
    id: "art",
    label: "Art",
    description:
      'Unlock <span class="text-pop">Artists</span><br/>Unlock <span class="text-prod">Monument</span><br/>Unlock <span class="text-special">Social Policies</span><br/>Unlock <span class="text-culture">Traditionalism</span><br/>Unlock <span class="text-culture">Imperialism</span>',
    require: ["trade", "spirituality"],
    rank: 3,
  },
  exploration: {
    id: "exploration",
    label: "Exploration",
    description:
      'Unlock <span class="text-troop">Scout</span><br/>Unlock <span class="text-special">World Map</span>',
    require: ["trade", "tools"],
    rank: 3,
  },
  agriculture: {
    id: "agriculture",
    label: "Agriculture",
    description:
      'Unlock <span class="text-pop">Farmers</span> <span class="text-food">+1 <i class="' +
      ug.food +
      '"></i><br/>Unlock <span class="text-prod">Granary</span>',
    require: ["tools", "mining"],
    rank: 3,
  },
  archery: {
    id: "archery",
    label: "Archery",
    description:
      'Unlock <span class="text-troop">Archer</span><br/>Unlock <span class="text-special">Statue of Zeus</span><br/>Unlock <span class="text-special">Temple of Artemis</span><br/>Unlock <span class="text-special">Troop queues</span>',
    require: ["tools"],
    rank: 3,
  },
  writing: {
    id: "writing",
    label: "Writing",
    description:
      'Unlock <span class="text-special">Building & troops purchase</span><br/>Unlock <span class="text-pop">Scholars</span><br/>Unlock <span class="text-prod">Treasury</span><br/>Unlock <span class="text-culture">Rationalism</span><br/>Unlock <span class="text-culture">Platonic Academy</span>',
    require: ["art", "exploration"],
    rank: 4,
  },
  state: {
    id: "state",
    label: "State",
    description:
      'Unlock <span class="text-special">Empire</span><br/>Unlock <span class="text-prod">Town Hall</span><br/>Unlock <span class="text-troop">Governor</span><br/>Unlock <span class="text-culture">Collective Rule</span><br/>Unlock <span class="text-culture">Militarism</span>',
    require: ["exploration", "agriculture"],
    rank: 4,
  },
  herding: {
    id: "herding",
    label: "Herding",
    description:
      'Unlock <span class="text-culture">Ancients\' Wisdom</span><br/>Unlock <span class="text-culture">Piety</span><br/>Unlock <span class="text-special">Pyramids</span>',
    require: ["agriculture"],
    rank: 4,
  },
  navigation: {
    id: "navigation",
    label: "Navigation",
    description:
      'Unlock <span class="text-special">Diplomacy</span><br/>Unlock <span class="text-special">Trade</span><br/>Unlock <span class="text-troop">Caravan</span><br/><span class="text-prod">+0.5 <i class="' +
      ug.prod +
      '"></i> / builder</span><br/>Unlock <span class="text-prod">Harbor</span><br/>Unlock <span class="text-culture">Pacifism</span>',
    require: ["exploration", "archery"],
    rank: 4,
  },
  armies: {
    id: "armies",
    label: "Armies",
    description:
      'Unlock <span class="text-prod">Training Center</span><br/>Unlock <span class="text-culture">Aristocracy</span><br/>Unlock <span class="text-culture">Meritocracy</span><br/>Unlock <span class="text-culture">Code of Honor</span>',
    require: ["state", "writing"],
    rank: 5,
  },
  horseriding: {
    id: "horseriding",
    label: "Horseriding",
    description:
      'Unlock <span class="text-prod">Stables</span><br/>Unlock <span class="text-troop">Horseman</span><br/>Unlock <span class="text-culture">Wonder Builder</span>',
    require: ["herding"],
    rank: 5,
  },
  bronze_working: {
    id: "bronze_working",
    label: "Bronze Working",
    description:
      'Unlock <span class="text-prod">Copper Mine</span><br/>Unlock <span class="text-special">Colossus</span><br/>Unlock <span class="text-special">Hanging Gardens</span><br/>Unlock <span class="text-prod">Workshop</span><br/>Unlock <span class="text-troop">Lancier</span><br/>Unlock <span class="text-troop">Worker</span><br/>Unlock <span class="text-improvement">Mine</span><br/>Unlock <span class="text-troop">Slaver</span>',
    require: ["navigation", "state"],
    rank: 5,
  },
  crop_rotation: {
    id: "crop_rotation",
    label: "Crop Rotation",
    description:
      '<span class="text-food">+1 <i class="' +
      ug.food +
      '"></i> / farmer</span><br/>Unlock <span class="text-prod">Gardens</span><br/>Unlock <span class="text-improvement">Farm</span>',
    require: ["herding"],
    rank: 5,
  },
  wheel: {
    id: "wheel",
    label: "Wheel",
    description:
      '<span class="text-gold">+1 <i class="' +
      ug.gold +
      '"></i> / merchant</span><br/><span class="text-trade">+1 <i class="' +
      ug.trade +
      '"></i> trade route</span><br/>Increase <span class="text-trade"><i class="' +
      ug.trade +
      '"></i> trade routes</span> max dist.<br/>Unlock <span class="text-prod">Amphitheatre</span><br/>Unlock <span class="text-improvement">Road</span>',
    require: ["horseriding", "armies"],
    rank: 6,
  },
  masonry: {
    id: "masonry",
    label: "Masonry",
    description:
      'Unlock <span class="text-prod">Palace</span><br/>Unlock <span class="text-prod">Walls</span><br/>Unlock <span class="text-prod">Well</span><br/>Unlock <span class="text-special">Apadana</span>',
    require: ["bronze_working"],
    rank: 6,
  },
  code_of_laws: {
    id: "code_of_laws",
    label: "Justice",
    description:
      'Unlock <span class="text-prod">Tribunal</span><br/>Unlock <span class="text-culture">Administration</span><br/>Unlock <span class="text-culture">Religious Laws</span><br/>Unlock <span class="text-culture">Code of Laws</span><br/>Unlock <span class="text-culture">Despotism</span><br/>Unlock <span class="text-culture">Organized Slavery</span>',
    require: ["bronze_working"],
    rank: 6,
  },
  calendar: {
    id: "calendar",
    label: "Calendar",
    description:
      'Unlock <span class="text-troop">Plague Doctors</span><br/>Unlock <span class="text-special">Great Ziggurat</span><br/>Unlock <span class="text-culture">City-State</span>',
    require: ["crop_rotation", "bronze_working"],
    rank: 6,
  },
  literature: {
    id: "literature",
    label: "Literature",
    description:
      'Unlock <span class="text-prod">Library</span><br/>Unlock <span class="text-special">Great Library</span><br/>Unlock <span class="text-culture">Philosophy</span><br/>Unlock <span class="text-culture">Oligarchy</span>',
    require: ["wheel"],
    rank: 7,
  },
  mathematics: {
    id: "mathematics",
    label: "Mathematics",
    description:
      'Unlock <span class="text-troop">Catapult</span><br/>Unlock <span class="text-prod">Market</span><br/>Unlock <span class="text-prod">Siege Factory</span><br/>Unlock <span class="text-improvement">Trading Post</span>',
    require: ["masonry", "calendar"],
    rank: 7,
  },
  diplomacy: {
    id: "diplomacy",
    label: "Diplomacy",
    description:
      'Unlock <span class="text-special">Global diplomacy</span><br/>Unlock <span class="text-special">Alliances</span><br/><span class="text-trade">+1 <i class="' +
      ug.trade +
      '"></i> trade route</span><br/>Unlock <span class="text-prod">Embassy</span><br/>Unlock <span class="text-culture">Patronage</span><br/>Unlock <span class="text-culture">Patriotism</span>',
    require: ["code_of_laws"],
    rank: 7,
  },
  religion: {
    id: "religion",
    label: "Religion",
    description:
      'Unlock <span class="text-special">Deity</span><br/>Unlock <span class="text-special">Spells</span><br/>Unlock <span class="text-pop">Priests</span><br/>Unlock <span class="text-prod">Temple</span><br/>Unlock <span class="text-special">Mausoleum of Halicarnassus</span><br/>Unlock <span class="text-culture">Organized Religion</span>',
    require: ["code_of_laws", "calendar"],
    rank: 7,
  },
  tactics: {
    id: "tactics",
    label: "Tactics",
    description:
      'Unlock <span class="text-special">Battle Simulator</span><br/>Unlock <span class="text-culture">Discipline</span>',
    require: ["mathematics"],
    rank: 8,
  },
  iron_working: {
    id: "iron_working",
    label: "Iron Working",
    description:
      'Unlock <span class="text-prod">Gold Mine</span><br/>Unlock <span class="text-prod">Furnace</span><br/>Unlock <span class="text-troop">Swordsman</span><br/>Unlock <span class="text-improvement">Forest Camp</span>',
    require: ["mathematics"],
    rank: 8,
  },
  monarchy: {
    id: "monarchy",
    label: "Monarchy",
    description:
      'Unlock <span class="text-troop">Spy</span><br/>Unlock <span class="text-culture">Landed Elites</span>',
    require: ["religion", "diplomacy"],
    rank: 8,
  },
  drama: {
    id: "drama",
    label: "Drama",
    description:
      '<span class="text-culture">+0.5 <i class="' +
      ug.culture +
      '"></i> / artist</span><br/>Unlock <span class="text-prod">Theatre</span><br/>Unlock <span class="text-culture">Philantropy</span>',
    require: ["literature", "religion"],
    rank: 8,
  },
  optics: {
    id: "optics",
    label: "Optics",
    description:
      'Unlock <span class="text-troop">Longbowman</span><br/><span class="text-trade">+1 <i class="' +
      ug.trade +
      '"></i> trade route</span><br/>Increase <span class="text-trade"><i class="' +
      ug.trade +
      '"></i> trade routes</span> max dist.',
    require: ["tactics"],
    rank: 9,
  },
  construction: {
    id: "construction",
    label: "Construction",
    description:
      'Unlock <span class="text-special">Pantheon</span><br/>Unlock <span class="text-special">Great Wall</span><br/>Unlock <span class="text-prod">Aqueduct</span>',
    require: ["tactics", "iron_working"],
    rank: 9,
  },
  milling: {
    id: "milling",
    label: "Milling",
    description:
      'Unlock <span class="text-prod">Mill</span><br/>Unlock <span class="text-culture">Conservatism</span>',
    require: ["iron_working"],
    rank: 9,
  },
  republic: {
    id: "republic",
    label: "Republic",
    description:
      'Unlock <span class="text-prod">Consulate</span><br/>Unlock <span class="text-culture">State Religion</span><br/>Unlock <span class="text-culture">Cultural Diplomacy</span>',
    require: ["monarchy", "drama"],
    rank: 9,
  },
  theology: {
    id: "theology",
    label: "Theology",
    description:
      '<span class="text-faith">+0.5 <i class="' +
      ug.faith +
      '"></i> / priest</span><br/>Unlock <span class="text-special">Reincarnation</span><br/>Unlock <span class="text-prod">Monastery</span><br/>Unlock <span class="text-culture">Secularism</span><br/>Unlock <span class="text-culture">Theocracy</span><br/>Unlock <span class="text-culture">Crusades</span>',
    require: ["republic", "optics"],
    rank: 10,
  },
  civil_service: {
    id: "civil_service",
    label: "Civil Service",
    description:
      'Unlock <span class="text-troop">Pikeman</span><br/>Unlock <span class="text-culture">Isolationism</span>',
    require: ["construction"],
    rank: 10,
  },
  feudalism: {
    id: "feudalism",
    label: "Feudalism",
    description:
      'Unlock <span class="text-culture">Sovereignty</span><br/>Unlock <span class="text-culture">Military Tradition</span>',
    require: ["construction", "milling"],
    rank: 10,
  },
  currency: {
    id: "currency",
    label: "Currency",
    description:
      'Unlock <span class="text-prod">Bank</span><br/>Unlock <span class="text-prod">Mint</span><br/>Unlock <span class="text-culture">Merchant Confederacy</span>',
    require: ["republic", "milling"],
    rank: 10,
  },
  music_theory: {
    id: "music_theory",
    label: "Music Theory",
    description:
      'Unlock <span class="text-prod">Circus</span><br/>Unlock <span class="text-culture">Proselytism</span>',
    require: ["theology"],
    rank: 11,
  },
  engineering: {
    id: "engineering",
    label: "Engineering",
    description:
      'Unlock <span class="text-pop">Scientists</span> <span class="text-science">+1 <i class="' +
      ug.science +
      '"></i><br/><span class="text-trade">+1 <i class="' +
      ug.trade +
      '"></i> trade route</span><br/>Increase <span class="text-trade"><i class="' +
      ug.trade +
      '"></i> trade routes</span> max dist.',
    require: ["civil_service"],
    rank: 11,
  },
  chivalry: {
    id: "chivalry",
    label: "Chivalry",
    description:
      'Unlock <span class="text-troop">Knight</span><br/>Unlock <span class="text-prod">Military Academy</span><br/>Unlock <span class="text-culture">Holy Wars</span><br/>Unlock <span class="text-culture">Professional Army</span>',
    require: ["feudalism", "civil_service"],
    rank: 11,
  },
  anatomy: {
    id: "anatomy",
    label: "Anatomy",
    description: 'Unlock <span class="text-prod">Hospital</span>',
    require: ["currency", "theology"],
    rank: 11,
  },
  advanced_fortification: {
    id: "advanced_fortification",
    label: "Adv. Fortification",
    description:
      'Unlock <span class="text-prod">Castle</span><br/>Unlock <span class="text-culture">Square of Miracles</span>',
    require: ["engineering"],
    rank: 12,
  },
  physics: {
    id: "physics",
    label: "Physics",
    description:
      'Unlock <span class="text-troop">Trebuchet</span><br/>Increase <span class="text-trade"><i class="' +
      ug.trade +
      '"></i> trade routes</span> max dist.',
    require: ["engineering"],
    rank: 12,
  },
  steel: {
    id: "steel",
    label: "Steel",
    description:
      'Unlock <span class="text-prod">Armory</span><br/>Unlock <span class="text-troop">Longswordsman</span>',
    require: ["chivalry"],
    rank: 12,
  },
  education: {
    id: "education",
    label: "Education",
    description:
      'Unlock <span class="text-prod">University</span><br/>Unlock <span class="text-troop">Explorer</span><br/>Unlock <span class="text-culture">Reformation</span><br/>Unlock <span class="text-culture">Scientific State</span><br/>Unlock <span class="text-culture">Scholasticism</span>',
    require: ["music_theory", "anatomy"],
    rank: 12,
  },
  gunpowder: {
    id: "gunpowder",
    label: "Gunpowder",
    description:
      'Unlock <span class="text-prod">Police Station</span><br/>Unlock <span class="text-troop">Musketman</span><br/>Unlock <span class="text-culture">Police State</span>',
    require: ["advanced_fortification", "education", "steel"],
    rank: 13,
  },
  astronomy: {
    id: "astronomy",
    label: "Astronomy",
    description:
      'Unlock <span class="text-special">Colonization</span><br/>Unlock <span class="text-special">Casa da India</span><br/>Unlock <span class="text-prod">Seaport</span><br/>Unlock <span class="text-troop">Caravel</span><br/>Unlock <span class="text-culture">Colonialism</span><br/>Unlock <span class="text-culture">Colonial Conquest</span>',
    require: ["education", "physics"],
    rank: 13,
  },
  printing: {
    id: "printing",
    label: "Printing Press",
    description:
      'Unlock <span class="text-special">Cultural promotion</span><br/>Unlock <span class="text-special">Forbidden City</span><br/>Unlock <span class="text-culture">Holy Place</span><br/>Unlock <span class="text-culture">Cultural Promotion</span>',
    require: ["education", "steel"],
    rank: 13,
  },
  acoustics: {
    id: "acoustics",
    label: "Acoustics",
    description:
      'Unlock <span class="text-prod">Opera</span><br/>Unlock <span class="text-special">Sistine Chapel</span><br/>Unlock <span class="text-special">Palace of Versailles</span>',
    require: ["education", "physics"],
    rank: 13,
  },
  chemistry: {
    id: "chemistry",
    label: "Chemistry",
    description:
      'Unlock <span class="text-troop">Cannon</span><br/>Unlock <span class="text-culture">Red Cross</span>',
    require: ["astronomy", "gunpowder"],
    rank: 14,
  },
  metallurgy: {
    id: "metallurgy",
    label: "Metallurgy",
    description: 'Unlock <span class="text-prod">Ironworks</span>',
    require: ["printing", "gunpowder"],
    rank: 14,
  },
  architecture: {
    id: "architecture",
    label: "Architecture",
    description:
      'Unlock <span class="text-prod">Courthouse</span><br/>Unlock <span class="text-special">Taj Mahal</span><br/>Unlock <span class="text-special">Tower of Pisa</span>',
    require: ["printing", "acoustics"],
    rank: 14,
  },
  economics: {
    id: "economics",
    label: "Economics",
    description:
      'Unlock <span class="text-prod">Stock Exchange</span><br/>Unlock <span class="text-special">Big Ben</span><br/>Unlock <span class="text-culture">Collaboration</span><br/>Unlock <span class="text-culture">Geographical Society</span>',
    require: ["printing"],
    rank: 14,
  },
  fertilizer: {
    id: "fertilizer",
    label: "Fertilizer",
    description:
      '<span class="text-food">+2 <i class="' +
      ug.food +
      '"></i> / farmer</span><br/>Unlock <span class="text-culture">Medical Procedures</span>',
    require: ["economics", "chemistry"],
    rank: 15,
  },
  rigging: {
    id: "rigging",
    label: "Square Rigging",
    description:
      '<span class="text-gold">+3% <i class="' +
      ug.gold +
      '"></i> / colony</span><br/>Unlock <span class="text-prod">Zoo</span><br/>Increase <span class="text-trade"><i class="' +
      ug.trade +
      '"></i> trade routes</span> max dist.<br/>Unlock <span class="text-culture">Conscription</span>',
    require: ["architecture", "metallurgy"],
    rank: 15,
  },
  siege: {
    id: "siege",
    label: "Siege Tactics",
    description: 'Unlock <span class="text-prod">Fortress</span>',
    require: ["architecture", "metallurgy"],
    rank: 15,
  },
  production: {
    id: "production",
    label: "Mass Production",
    description:
      'Unlock <span class="text-prod">Arsenal</span><br/>Unlock <span class="text-culture">Monopoly</span>',
    require: ["economics", "metallurgy"],
    rank: 15,
  },
  scientific: {
    id: "scientific",
    label: "Scientific Theory",
    description:
      'Unlock <span class="text-prod">Public School</span><br/>Unlock <span class="text-special">Oxford University</span><br/>Unlock <span class="text-culture">World Congress</span>',
    require: ["rigging", "fertilizer"],
    rank: 16,
  },
  industrialization: {
    id: "industrialization",
    label: "Industrialization",
    description:
      'Unlock <span class="text-prod">Factory</span><br/>Unlock <span class="text-prod">Progress</span><br/>Unlock <span class="text-special">Ruhr Valley</span><br/>Unlock <span class="text-troop">Engineer</span>',
    require: ["rigging", "production"],
    rank: 16,
  },
  military: {
    id: "military",
    label: "Military Science",
    description:
      'Unlock <span class="text-troop">Cavalry</span><br/>Unlock <span class="text-special">Brandenburg Gate</span>',
    require: ["siege", "production"],
    rank: 16,
  },
  archeology: {
    id: "archeology",
    label: "Archeology",
    description:
      'Unlock <span class="text-special">Ruins</span> (Tech +100 req.)<br/>Unlock <span class="text-troop">Archeologist</span> (Tech +100 req.)<br/>Unlock <span class="text-prod">Museum</span><br/>Unlock <span class="text-special">Hermitage</span>',
    require: ["production"],
    rank: 16,
  },
  steam: {
    id: "steam",
    label: "Steam Power",
    description:
      'Unlock <span class="text-prod">Coal Mine</span><br/>Unlock <span class="text-special">Panama Canal</span>',
    require: ["industrialization", "scientific"],
    rank: 17,
  },
  corporation: {
    id: "corporation",
    label: "Corporation",
    description:
      'Unlock <span class="text-prod">Gold Reserve</span><br/><span class="text-trade">+1 <i class="' +
      ug.trade +
      '"></i> trade route</span><br/>Unlock <span class="text-culture">Liberalism</span><br/>Allow buying <span class="text-prod">Progress</span> with <i class="text-gold ' +
      ug.gold +
      '"></i>',
    require: ["scientific", "military"],
    rank: 17,
  },
  rifling: {
    id: "rifling",
    label: "Rifling",
    description: 'Unlock <span class="text-troop">Rifleman</span>',
    require: ["industrialization", "military"],
    rank: 17,
  },
  biology: {
    id: "biology",
    label: "Biology",
    description:
      'Unlock <span class="text-prod">Dispensary</span><br/>Unlock <span class="text-culture">National Institute of Health</span>',
    require: ["scientific", "archeology"],
    rank: 17,
  },
  electricity: {
    id: "electricity",
    label: "Electricity",
    description:
      'Unlock <span class="text-improvement">Industrial Park</span><br/>Unlock <span class="text-prod">Hydro Plant</span>',
    require: ["steam"],
    rank: 18,
  },
  railroad: {
    id: "railroad",
    label: "Railroad",
    description:
      'Unlock <span class="text-improvement">Railroad</span><br/>Unlock <span class="text-special">Eiffel Tower</span>',
    require: ["steam", "corporation"],
    rank: 18,
  },
  dynamite: {
    id: "dynamite",
    label: "Dynamite",
    description:
      'Unlock <span class="text-troop">Artillery</span><br/>Unlock <span class="text-culture">Civilizing Mission</span>',
    require: ["steam", "rifling"],
    rank: 18,
  },
  sanitation: {
    id: "sanitation",
    label: "Sanitation",
    description:
      'Unlock <span class="text-improvement">Mechanized Farm</span><br/>Unlock <span class="text-prod">Quarantine Station</span><br/>Unlock <span class="text-culture">World Health Organization</span>',
    require: ["biology"],
    rank: 18,
  },
  future: {
    id: "future",
    label: "Future Tech.",
    description:
      'Can be researched repeatedly.<br/>Produce <span class="text-progress"><i class="' +
      ug.progress +
      '"></i> +10</span>',
    require: ["electricity", "railroad", "dynamite", "sanitation"],
    rank: 19,
  },
};