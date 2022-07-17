import { CardValue } from "../interfaces/card.interface";
import { GameRules } from "../interfaces/game.interface";

export interface IBaseRule {
  title: string;
  description: string;
}
export interface IExampleRule extends IBaseRule {
  example?: string;
}
export const SHOT_RULES: Record<string, IBaseRule> = {
  halfAShot: {
    title: "1/2 Shots",
    description: "Drink half a shot.",
  },
  fullShot: {
    title: "1 Shots",
    description: "Drink a shot.",
  },
};

export const DRINKING_GAMES_RULES: Record<any, IExampleRule> = {
  neverHaveIEver: {
    title: "Never Have I Ever",
    description:
      "You say 'Never have I ever done something before'. If the others have done it, drink up.",
    example:
      "You say ie: 'Never Have I ever been arrested before.' Everyone who has been arrested, must drink.",
  },
  twoTruthsOneLie: {
    title: "Two Truths 1 Lie",
    description:
      "You tell 3 statements, 2 truths, 1 lie. The others must guess which is the lie, you have to drink, if they are wrong, they have to drink.",
    example:
      "I have a dog. I have a cat. I can fly. If you guessed 'I have a cat', you are right. Cat people, pff.",
  },
};

export const BASIC_RULES: GameRules = {};
BASIC_RULES[CardValue.JACK] = SHOT_RULES.halfAShot;
BASIC_RULES[CardValue.QUEEN] = DRINKING_GAMES_RULES.neverHaveIEver;
BASIC_RULES[CardValue.KING] = SHOT_RULES.fullShot;

export const WALKTHROUGH_RULES: GameRules = {
  [CardValue.JACK]: SHOT_RULES.fullShot,
  [CardValue.QUEEN]: DRINKING_GAMES_RULES.neverHaveIEver,
  [CardValue.KING]: DRINKING_GAMES_RULES.twoTruthsOneLie,
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
