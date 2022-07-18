import { CardValue } from "../interfaces/card.interface";
import {
  GameRules,
  IBaseRule,
  IExampleRule,
  IGameRulesWithDescription,
} from "../interfaces/rules.interface";
/* RULES */
const halfAShot: IBaseRule = {
  title: "1/2 Shots",
  description: "Drink half a shot.",
};
const fullShot: IBaseRule = {
  title: "1 Shots",
  description: "Drink a shot.",
};

const neverHaveIEver: IExampleRule = {
  title: "Never Have I Ever",
  description:
    "You say 'Never have I ever done something before'. If the others have done it, drink up.",
  example:
    "You say ie: 'Never Have I ever been arrested before.' Everyone who has been arrested, must drink.",
};

const twoTruthsOneLie: IExampleRule = {
  title: "Two Truths 1 Lie",
  description:
    "You tell 3 statements, 2 truths, 1 lie. The others must guess which is the lie, you have to drink, if they are wrong, they have to drink.",
  example:
    "I have a dog. I have a cat. I can fly. If you guessed 'I have a cat', you are right. Cat people, pff.",
};

const chugTheNextDrink: IBaseRule = {
  title: "Chug the next drink you see, in one go.",
  description: "Chug it. Chug it. Chug it!",
};
/* RULES */

/* CATEGORY */

/* GAME RULES */

/* For Walkthrough Purposes */
export const WALKTHROUGH_GAME_RULES: GameRules = {
  [CardValue.JACK]: fullShot,
  [CardValue.QUEEN]: neverHaveIEver,
  [CardValue.KING]: twoTruthsOneLie,
};

export const WALKTHROUGH_GAME_RULES_WITH_DESCRIPTION: IGameRulesWithDescription =
  {
    title: "Walkthrough",
    about: "",
    description: "For educational purposes only.",
    rules: WALKTHROUGH_GAME_RULES,
  };
/* For Walkthrough Purposes */

export const BASIC_GAME_RULES: GameRules = {};
BASIC_GAME_RULES[CardValue.JACK] = halfAShot;
BASIC_GAME_RULES[CardValue.QUEEN] = neverHaveIEver;
BASIC_GAME_RULES[CardValue.KING] = fullShot;

export const BASIC_GAME_RULES_WITH_DESCRIPTION: IGameRulesWithDescription = {
  title: "Basic",
  about: "At this point I'm out of information.",
  description: `JACK: half a Shot;
  QUEEN: never have I ever;
  KING: a full shot;`,
  rules: BASIC_GAME_RULES,
};

export const CRAZY_GAME_RULES: GameRules = {
  ...BASIC_GAME_RULES,
  [CardValue.THREE]: chugTheNextDrink,
};
export const CRAZY_GAME_RULES_WITH_DESCRIPTION: IGameRulesWithDescription = {
  title: "Crazy",
  about:
    "Lorem Ipsum. I don't even know, how to describe it. That's how crazy it is.",
  description: `WIP.`,
  rules: CRAZY_GAME_RULES,
};

export const ADVERSITY_RICH_GAME_RULES: GameRules = {
  ...BASIC_GAME_RULES,
};
export const ADVERSITY_RICH_GAME_RULES_WITH_DESCRIPTION: IGameRulesWithDescription =
  {
    title: "Adversity-Rich",
    about: "I'm just making up words as I go now.",
    description: `WIP.`,
    rules: ADVERSITY_RICH_GAME_RULES,
  };

/* GAME RULES */

export const GAME_RULES_WITH_DESCRIPTION = [
  CRAZY_GAME_RULES_WITH_DESCRIPTION,
  BASIC_GAME_RULES_WITH_DESCRIPTION,
  ADVERSITY_RICH_GAME_RULES_WITH_DESCRIPTION,
];
