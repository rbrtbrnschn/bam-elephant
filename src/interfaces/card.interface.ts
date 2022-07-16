export type Numbers = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";
export type FaceAbbreviations = "J" | "Q" | "K" | "A";
export type SuitAbbreviation = "S" | "D" | "C" | "H";
export type ValueAbbreviation = Numbers | FaceAbbreviations;
export type CardCode = `${ValueAbbreviation}${SuitAbbreviation}`;
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
}
export enum CardSuit {
  DIAMONDS = 1,
  HEARTS,
  SPADES,
  CLUBS,
}

export interface ICard {
  code: CardCode;
  image: string;
  images?: {
    svg: string;
    png: string;
  };
  value: CardValue;
  suit: CardSuit;
}
