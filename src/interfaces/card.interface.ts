export type Numbers = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";
export type FaceAbbreviations = "J" | "Q" | "K" | "A";
export type SuitAbbreviation = "S" | "D" | "C" | "H";
export type ValueAbbreviation = Numbers | FaceAbbreviations;
export type BamElephantCode = "BE";
export type CardCode =
  | `${ValueAbbreviation}${SuitAbbreviation}`
  | BamElephantCode;
export enum CardValue {
  TWO = 2,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE,
  ELEPHANT,
}
/**
 * Turns CardValue enum value into readable value.
 * ie: 11 => jack, 12 => queen, ...
 * @param cardValue {CardValue} - CardValue enum value
 * @returns {string}
 */
export const cardValueToName = (cardValue: CardValue) => {
  if (cardValue <= 10) return cardValue + "";
  return cardValue === 11
    ? "jack"
    : cardValue === 12
    ? "queen"
    : cardValue === 13
    ? "king"
    : cardValue === 14
    ? "ace"
    : cardValue === 15
    ? "Bam Elephant"
    : "unknown";
};
export enum CardSuit {
  DIAMONDS = 1,
  HEARTS,
  SPADES,
  CLUBS,
  OTHER,
}
/**
 * Turns CardSuit to readable value.
 * @param cardSuit {CardSuit} suit
 * @returns {string}
 */
export const cardSuitToName = (cardSuit: CardSuit) => {
  const suits = { 1: "diamonds", 2: "hearts", 3: "spades", 4: "clubs", 5: "" };
  return suits[cardSuit];
};
export interface ICard {
  code: CardCode;
  image: string;
  images?: {
    svg?: string;
    png: string;
  };
  value: CardValue;
  suit: CardSuit;
}

export interface IUndoCard extends ICard {
  isUndo: boolean;
}
