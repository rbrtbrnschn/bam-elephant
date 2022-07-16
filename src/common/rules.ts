import { CardValue } from "../interfaces/card.interface";
import { GameRules } from "../store";

export const DEFAULT_RULES: GameRules = {};
DEFAULT_RULES[CardValue.JACK] = "1/2 Shot";
DEFAULT_RULES[CardValue.QUEEN] = "Never Have I Ever";
DEFAULT_RULES[CardValue.KING] = "1 Shot";
