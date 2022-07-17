import { CardValue } from "../interfaces/card.interface";
import { GameRules } from "../interfaces/game.interface";

export const BASIC_RULES: GameRules = {};
BASIC_RULES[CardValue.JACK] = "1/2 Shot";
BASIC_RULES[CardValue.QUEEN] = "Never Have I Ever";
BASIC_RULES[CardValue.KING] = "1 Shot";

export const WALKTHROUGH_RULES: GameRules = {
  [CardValue.JACK]: "Drink 1 Shot",
  [CardValue.QUEEN]: "Never Have I Ever",
  [CardValue.KING]: "2 Truths, 1 Lie",
};

export const LOW_KEY_RULES: GameRules = {
  ...BASIC_RULES,
};

export const CRAZY_RULES: GameRules = {
  ...BASIC_RULES,
};

export const ADVERSITY_RICH_RULES: GameRules = {
  ...BASIC_RULES,
};

export const RULE_SETS = {
  basic: {
    title: "basic",
    rules: BASIC_RULES,
  },
  crazy: {
    title: "crazy",
    rules: CRAZY_RULES,
  },
  adversityRich: {
    title: "adversity-rich",
    rules: ADVERSITY_RICH_RULES,
  },
};

export type RuleSets = keyof typeof RULE_SETS;
