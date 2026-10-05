// Reverse-engineered from webpack module zUnb
// Original variable: gg
// Difficulty levels and AI/barbarian modifiers
// Entries (~): 4
// Source range: 684576-686492

const difficulties = {
  0: {
    name: "Peaceful",
    description:
      "- Barbarians attacks disabled<br/>- AI attacks disabled<br/>- Big penalties for barbarians<br/>- No bonuses for AI<br/>- No plague<br/>- Faith production -25%",
    ai_bonus: 1,
    ai_golden_bonus: 1.2,
    ai_recruit_bonus: 0.8,
    barbarian_battle_mult: 0.5,
    barbarian_science_mult: 0.1,
    barbarian_gold_prod_mult: 0.3,
    faith_mult: 0.75,
  },
  1: {
    name: "Relax",
    description:
      "- Barbarians attacks disabled<br />- AI attacks enabled but rare<br/>- Big penalties for barbarians<br/>- Small bonuses for AI",
    ai_bonus: 1.1,
    ai_golden_bonus: 1.3,
    ai_recruit_bonus: 1,
    barbarian_battle_mult: 0.7,
    barbarian_science_mult: 0.2,
    barbarian_gold_prod_mult: 0.4,
    faith_mult: 1,
  },
  2: {
    name: "Normal",
    description:
      "- Barbarians attacks enabled<br />- AI attacks enabled<br/>- Moderate penalties for barbarians<br/>- Moderate bonuses for AI<br/>- Faith production +25%",
    ai_bonus: 1.3,
    ai_golden_bonus: 1.6,
    ai_recruit_bonus: 1.2,
    barbarian_battle_mult: 0.8,
    barbarian_science_mult: 0.3,
    barbarian_gold_prod_mult: 0.5,
    faith_mult: 1.25,
  },
  3: {
    name: "Hardcore",
    description:
      "- Barbarians attacks more frequent<br />- AI attacks more frequent<br/>- No penalties for Barbarians (except science)<br/>- Big bonuses for AI<br/>- Faith production +50%",
    ai_bonus: 1.6,
    ai_golden_bonus: 2,
    ai_recruit_bonus: 1.5,
    barbarian_battle_mult: 1,
    barbarian_science_mult: 0.5,
    barbarian_gold_prod_mult: 1,
    faith_mult: 1.5,
  },
};

export default difficulties;
