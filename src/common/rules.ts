import { CardValue } from "../interfaces/card.interface";
import { GameRules } from "../interfaces/game.interface";

export const BASIC_RULES: GameRules = {};
BASIC_RULES[CardValue.JACK] = "1/2 Shot";
BASIC_RULES[CardValue.QUEEN] = "Never Have I Ever";
BASIC_RULES[CardValue.KING] = "1 Shot";

export const TESTING_RULES: GameRules = {
  [CardValue.EIGHT]: "Ask Magic 8 Ball",
  [CardValue.NINE]: "Shout NEIN!",
  [CardValue.TEN]: "Slap Bet",
};
