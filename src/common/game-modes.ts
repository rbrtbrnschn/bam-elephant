import { toast } from "react-toastify";
import { CardValue } from "../interfaces/card.interface";
import { GameMode } from "../interfaces/game.interface";

export const BASIC_GAME_MODE: GameMode = {
  [CardValue.SEVEN]: (options) => {
    options.thunks.shuffle();
    toast.warn("Shuffling Leftover Cards.");
  },
  [CardValue.ACE]: (options) => {
    options.actions.toggleModal();
  },
};

export const WALKTHROUGH_GAME_MODE: GameMode = { ...BASIC_GAME_MODE };

export const LOW_KEY_GAME_MODE: GameMode = {
  [CardValue.JACK]: (options) => {
    options.actions.toggleModal();
  },
  [CardValue.QUEEN]: (options) => {
    options.actions.toggleModal();
  },
  [CardValue.KING]: (options) => {
    options.actions.toggleModal();
  },
};

export const OUTDOORS_GAME_MODE: GameMode = {
  ...LOW_KEY_GAME_MODE,
};

export const AT_THE_CLUB_GAME_MODE: GameMode = {
  ...LOW_KEY_GAME_MODE,
};

export const GAMEMODES = {
  lowkey: {
    title: "low-key",
    gamemode: LOW_KEY_GAME_MODE,
  },
  outdoors: {
    title: "outdoors",
    gamemode: OUTDOORS_GAME_MODE,
  },
  atTheClub: {
    title: "@the-club",
    gamemode: AT_THE_CLUB_GAME_MODE,
  },
};
export type GameModes = keyof typeof GAMEMODES;
