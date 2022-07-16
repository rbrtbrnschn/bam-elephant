import { CardValue } from "../interfaces/card.interface";

export const DEFAULT_RULES: Partial<Record<CardValue, string>> = {};
DEFAULT_RULES[CardValue.JACK] = "1/2 Shot";
DEFAULT_RULES[CardValue.QUEEN] = "Never Have I Ever";
DEFAULT_RULES[CardValue.KING] = "1 Shot";
