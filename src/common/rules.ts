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
